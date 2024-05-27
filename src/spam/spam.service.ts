import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Spam} from './spam.model';
import {User} from '../user/user.model';

@Injectable()
export class SpamService {
  constructor(
    @InjectModel(Spam)
    private readonly spamModel: typeof Spam,
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async markAsSpam(phoneNumber: string): Promise<void> {
    try {
      const user = await this.userModel.findOne({where: {phoneNumber}});
      const [spam, created] = await this.spamModel.findOrCreate({
        where: {phoneNumber},
        defaults: {isSpam: true, count: 1, userId: user?.id},
      });

      if (!created) {
        await spam.increment('count');
      }
    } catch (error) {
      throw new Error(`Error marking as spam: ${error}`);
    }
  }
}
