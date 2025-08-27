import { Test, TestingModule } from '@nestjs/testing';
import { CreateFinanceUseCase } from '../../../../../../src/modules/finances/application/use-case/create-finances.usecase';
import { IFinanceRepository } from '../../../../../../src/modules/finances/domain/finance.repository';
import { CreateFinanceDto } from '../../../../../../src/modules/finances/application/dto/create-finance.dto';
import { Finance } from '../../../../../../src/modules/finances/domain/entities/finance.entity';
import { getMapperToken } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { FinanceTypeEnum } from '../../../../../../src/modules/finances/domain/enums/finance-type.enum';

describe('CreateFinanceUseCase', () => {
  let useCase: CreateFinanceUseCase;
  let financeRepository: jest.Mocked<IFinanceRepository>;
  let mapper: jest.Mocked<Mapper>;

  beforeEach(async () => {
    financeRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      list: jest.fn(),
      update: jest.fn(),
      softDelete: jest.fn(),
    } as jest.Mocked<IFinanceRepository>;

    mapper = {
      map: jest.fn(),
    } as unknown as jest.Mocked<Mapper>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateFinanceUseCase,
        {
          provide: 'IFinanceRepository',
          useValue: financeRepository,
        },
        {
          provide: getMapperToken(),
          useValue: mapper,
        },
      ],
    }).compile();

    useCase = module.get<CreateFinanceUseCase>(CreateFinanceUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('deve criar uma finança e retornar o id', async () => {
      const createFinanceDto: CreateFinanceDto = {
        id: 0,
        type: FinanceTypeEnum.INCOME,
        amount: 100,
        description: 'Test Finance',
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const finance = new Finance({
        type: createFinanceDto.type,
        amount: createFinanceDto.amount,
        description: createFinanceDto.description,
        date: createFinanceDto.date,
      });

      const financeId = 1;

      // mapper.map.mockReturnValue(finance);
      financeRepository.create.mockResolvedValue(financeId);

      const result = await useCase.execute(createFinanceDto);

      expect(mapper.map).toHaveBeenCalledWith(createFinanceDto, CreateFinanceDto, Finance);
      expect(financeRepository.create).toHaveBeenCalledWith(finance);
      expect(result).toBe(financeId);
    });

    it('deve lançar um erro se a criação do repositório falhar', async () => {
      const createFinanceDto: CreateFinanceDto = {
        id: 0,
        type: FinanceTypeEnum.EXPENSE,
        amount: 50,
        description: 'Test Finance Error',
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const finance = new Finance({
        type: createFinanceDto.type,
        amount: createFinanceDto.amount,
        description: createFinanceDto.description,
        date: createFinanceDto.date,
      });

      const error = new Error('Database error');

      // mapper.map.mockReturnValue(finance);
      financeRepository.create.mockRejectedValue(error);

      await expect(useCase.execute(createFinanceDto)).rejects.toThrow(error);
      expect(mapper.map).toHaveBeenCalledWith(createFinanceDto, CreateFinanceDto, Finance);
      expect(financeRepository.create).toHaveBeenCalledWith(finance);
    });
  });
});
