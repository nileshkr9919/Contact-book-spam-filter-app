import {Test, TestingModule} from '@nestjs/testing';
import {SearchController} from './search.controller';
import {SearchService} from './search.service';
import {getModelToken} from '@nestjs/sequelize';
import {Contact} from '../contact/contact.model';
import {Spam} from '../spam/spam.model';
import {User} from '../user/user.model';

describe('SearchController', () => {
  let controller: SearchController;
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
      controllers: [SearchController],
      providers: [
        SearchService,
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

    controller = module.get<SearchController>(SearchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
