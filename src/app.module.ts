import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {SequelizeModule} from '@nestjs/sequelize';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';
import configuration from './config/configuration';
import {User} from './user/user.model';
import {SpamModule} from './spam/spam.module';
import {Spam} from './spam/spam.model';
import {Contact} from './contact/contact.model';
import {SearchModule} from './search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        autoLoadModels: true,
        synchronize: false,
        dialectOptions: {
          ssl: {rejectUnauthorized: false},
        },
      }),
      inject: [ConfigService],
    }),
    SequelizeModule.forFeature([User, Spam, Contact]),
    AuthModule,
    UserModule,
    SpamModule,
    SearchModule,
  ],
})
export class AppModule {}
