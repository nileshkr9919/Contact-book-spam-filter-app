import {Test, TestingModule} from '@nestjs/testing';
import {SpamController} from './spam.controller';
import {SpamService} from './spam.service';
import {getModelToken} from '@nestjs/sequelize';
import {User} from '../user/user.model';
import {Spam} from './spam.model';

describe('SpamController', () => {
  let controller: SpamController;

  const mockSpamModel = {
    findOne: jest.fn(),
  };

  const mockUserModel = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpamController],
      providers: [
        SpamService,
        {
          provide: getModelToken(Spam),
          useValue: mockSpamModel,
        },
        {
          provide: getModelToken(User),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    controller = module.get<SpamController>(SpamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
