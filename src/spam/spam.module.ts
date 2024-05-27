import {Module} from '@nestjs/common';
import {SpamController} from './spam.controller';
import {SpamService} from './spam.service';
import {SequelizeModule} from '@nestjs/sequelize';
import {Spam} from './spam.model';
import {User} from '../user/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Spam, User])],
  providers: [SpamService],
  controllers: [SpamController],
  exports: [SpamService],
})
export class SpamModule {}
