import {Test, TestingModule} from '@nestjs/testing';
import {AuthController} from './auth.controller';
import {UserService} from '../user/user.service';
import {getModelToken} from '@nestjs/sequelize';
import {User} from '../user/user.model';
import {AuthService} from './auth.service';
import {JwtService} from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;

  const mockUserModel = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        UserService,
        {
          provide: getModelToken(User),
          useValue: mockUserModel,
        },
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
