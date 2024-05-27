import {Controller, Post, Body, UnauthorizedException} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UserService} from '../user/user.service';
import {ApiBody, ApiResponse, ApiTags} from '@nestjs/swagger';
import {User} from '../user/user.model';

@ApiTags('AuthController')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        phoneNumber: {type: 'string', example: '+1-(121)-12354'},
        password: {type: 'string', example: 'password123'},
      },
      required: ['phoneNumber', 'password'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The access token is successfully generated.',
  })
  @ApiResponse({status: 401, description: 'Invalid Credentials.'})
  async login(@Body() req) {
    const user = await this.authService.validateUser(
      req.phoneNumber,
      req.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('register')
  @ApiBody({type: User})
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({status: 400, description: 'Bad Request.'})
  async register(@Body() createUserDto) {
    const user = await this.userService.findByPhoneNumber(
      createUserDto.phoneNumber,
    );
    if (user) {
      throw new UnauthorizedException('Phone number already registered');
    }
    return this.authService.register(createUserDto);
  }
}
