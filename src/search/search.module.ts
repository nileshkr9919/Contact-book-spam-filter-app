import {Module} from '@nestjs/common';
import {SearchService} from './search.service';
import {SearchController} from './search.controller';
import {SequelizeModule} from '@nestjs/sequelize';
import {Contact} from '../contact/contact.model';
import {User} from '../user/user.model';
import {Spam} from '../spam/spam.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Spam, Contact])],
  providers: [SearchService],
  controllers: [SearchController],
})
export class SearchModule {}
