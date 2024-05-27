import {Test, TestingModule} from '@nestjs/testing';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {getModelToken} from '@nestjs/sequelize';
import {User} from './user.model';

describe('UserController', () => {
  let controller: UserController;
  const mockUserModel = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getModelToken(User),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
