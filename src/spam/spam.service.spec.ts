import {Test, TestingModule} from '@nestjs/testing';
import {SpamService} from './spam.service';
import {getModelToken} from '@nestjs/sequelize';
import {User} from '../user/user.model';
import {Spam} from './spam.model';

describe('SpamService', () => {
  let service: SpamService;

  const mockSpamModel = {
    findOne: jest.fn(),
  };

  const mockUserModel = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<SpamService>(SpamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
