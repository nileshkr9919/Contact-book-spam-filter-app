import {Test, TestingModule} from '@nestjs/testing';
import {AuthService} from './auth.service';
import {getModelToken} from '@nestjs/sequelize';
import {Contact} from '../contact/contact.model';
import {Spam} from '../spam/spam.model';
import {User} from '../user/user.model';
import {JwtService} from '@nestjs/jwt';
import {UserService} from '../user/user.service';

describe('AuthService', () => {
  let service: AuthService;

  const mockUserModel = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  const mockContactModel = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  const mockSpamModel = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserService,
        JwtService,
        {
          provide: getModelToken(User),
          useValue: mockUserModel,
        },
        {
          provide: getModelToken(Contact),
          useValue: mockContactModel,
        },
        {
          provide: getModelToken(Spam),
          useValue: mockSpamModel,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
