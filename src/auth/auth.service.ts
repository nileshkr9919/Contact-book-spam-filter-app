import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {UserService} from '../user/user.service';
import {User} from '../user/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(phoneNumber: string, pass: string): Promise<any> {
    const user = await this.userService.findByPhoneNumber(phoneNumber);
    if (user && (await user.validatePassword(pass))) {
      const {phoneNumber, id} = user;
      return {phoneNumber, id};
    }
    return null;
  }

  async login(user: any) {
    const payload = {phoneNumber: user.phoneNumber, sub: user.id};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: any): Promise<User> {
    return this.userService.create(user);
  }
}
