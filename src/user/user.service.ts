import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {User} from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async create(user: any): Promise<User> {
    return this.userModel.create(user);
  }

  async findById(id: number): Promise<User> {
    return this.userModel.findByPk(id);
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User> {
    return this.userModel.findOne({where: {phoneNumber}});
  }
}
