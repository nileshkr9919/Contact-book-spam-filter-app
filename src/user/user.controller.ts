import {Controller, Get, Request, UseGuards} from '@nestjs/common';
import {UserService} from './user.service';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {ApiBearerAuth, ApiTags, ApiResponse} from '@nestjs/swagger';

@ApiTags('UserController')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiResponse({status: 200, description: 'Return user profile'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  async getProfile(@Request() req) {
    return this.userService.findById(req.user.userId);
  }
}
