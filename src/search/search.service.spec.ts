import {Test, TestingModule} from '@nestjs/testing';
import {getModelToken} from '@nestjs/sequelize';
import {SearchService} from './search.service';
import {User} from '../user/user.model';
import {Contact} from '../contact/contact.model';
import {Spam} from '../spam/spam.model';

describe('SearchService', () => {
  let service: SearchService;

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

    service = module.get<SearchService>(SearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('searchByName', () => {
    it('should return users matching the name', async () => {
      const users = [
        {
          id: 1,
          name: 'John Doe',
          phoneNumber: '1234567890',
          spam: {isSpam: false},
        },
      ];
      mockUserModel.findAll.mockResolvedValue(users);

      const result = await service.searchByName('John');
      expect(result).toEqual([
        {name: 'John Doe', phoneNumber: '1234567890', isSpam: false},
      ]);
    });
  });

  describe('searchByNumber', () => {
    it('should return registered user details if user is found', async () => {
      const registeredUser = {
        id: 1,
        name: 'John Doe',
        phoneNumber: '1234567890',
        spam: {isSpam: false},
        email: 'john@example.com',
      };
      const contacts = [];
      const spam = {isSpam: false};

      mockUserModel.findOne.mockResolvedValue(registeredUser);
      mockContactModel.findAll.mockResolvedValue(contacts);
      mockSpamModel.findOne.mockResolvedValue(spam);
      mockContactModel.findOne.mockResolvedValue({});

      const result = await service.searchByNumber('1234567890', 1);
      expect(result).toEqual([
        {
          name: 'John Doe',
          phoneNumber: '1234567890',
          isSpam: false,
          email: 'john@example.com',
        },
      ]);
    });

    it('should return contact details if no registered user is found', async () => {
      const registeredUser = null;
      const contacts = [{name: 'Jane Doe', phoneNumber: '1234567890'}];
      const spam = {isSpam: false};

      mockUserModel.findOne.mockResolvedValue(registeredUser);
      mockContactModel.findAll.mockResolvedValue(contacts);
      mockSpamModel.findOne.mockResolvedValue(spam);

      const result = await service.searchByNumber('1234567890', 1);
      expect(result).toEqual([
        {name: 'Jane Doe', phoneNumber: '1234567890', isSpam: false},
      ]);
    });
  });
});
