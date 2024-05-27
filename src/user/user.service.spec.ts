import {Test, TestingModule} from '@nestjs/testing';
import {UserService} from './user.service';
import {getModelToken} from '@nestjs/sequelize';
import {User} from './user.model';

describe('UserService', () => {
  let service: UserService;
  const mockUserModel = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
