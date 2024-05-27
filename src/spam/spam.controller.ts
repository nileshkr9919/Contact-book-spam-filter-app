import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {SpamService} from './spam.service';
import {ApiBearerAuth, ApiTags, ApiResponse, ApiBody} from '@nestjs/swagger';

@ApiTags('SpamController')
@ApiBearerAuth()
@Controller('spam')
export class SpamController {
  constructor(private readonly spamService: SpamService) {}

  @UseGuards(JwtAuthGuard)
  @Post('mark-spam')
  @ApiBody({
    description: 'Phone number to mark as spam',
    schema: {
      type: 'object',
      properties: {
        phoneNumber: {type: 'string', example: '+1-(121)-12354'},
      },
    },
  })
  @ApiResponse({status: 200, description: 'Phone number marked as spam'})
  async markAsSpam(@Body('phoneNumber') phoneNumber: string) {
    await this.spamService.markAsSpam(phoneNumber);
  }
}
