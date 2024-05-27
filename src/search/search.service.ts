import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Op} from 'sequelize';
import {Contact} from '../contact/contact.model';
import {Spam} from '../spam/spam.model';
import {User} from '../user/user.model';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    @InjectModel(Contact)
    private readonly contactModel: typeof Contact,
    @InjectModel(Spam)
    private readonly spamModel: typeof Spam,
  ) {}

  async searchByName(name: string) {
    const users = await this.userModel.findAll({
      where: {
        name: {
          [Op.iLike]: `${name}%`,
        },
      },
      include: [Spam],
    });

    const userContainingName = await this.userModel.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: [Spam],
    });

    const uniqueUsers = [
      ...new Map(
        [...users, ...userContainingName].map(item => [item['id'], item]),
      ).values(),
    ];

    return uniqueUsers.map(user => {
      return {
        name: user.name,
        phoneNumber: user.phoneNumber,
        isSpam: !!user.spam?.isSpam,
      };
    });
  }

  async searchByNumber(phoneNumber: string, userId: number): Promise<any> {
    const [registeredUser, contacts, spam] = await Promise.all([
      this.userModel.findOne({
        where: {phoneNumber},
        include: [Spam],
      }),
      this.contactModel.findAll({
        where: {phoneNumber},
        include: [User],
      }),
      this.spamModel.findOne({where: {phoneNumber}}),
    ]);

    if (registeredUser) {
      const isUserMutualWithResult = await this.contactModel.findOne({
        where: {phoneNumber: registeredUser.phoneNumber, userId},
      });
      return [
        {
          name: registeredUser.name,
          phoneNumber: registeredUser.phoneNumber,
          isSpam: !!registeredUser.spam?.isSpam,
          ...(isUserMutualWithResult && {email: registeredUser.email}),
        },
      ];
    }

    return contacts.map(contact => {
      return {
        name: contact.name,
        phoneNumber: contact.phoneNumber,
        isSpam: !!spam?.isSpam,
      };
    });
  }
}
