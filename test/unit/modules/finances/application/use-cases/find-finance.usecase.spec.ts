import { Test, TestingModule } from '@nestjs/testing';
import { FindFinanceUseCase } from '../../../../../../src/modules/finances/application/use-case/find-finances.usecase';
import { IFinanceRepository } from '../../../../../../src/modules/finances/domain/finance.repository';
import { Finance } from '../../../../../../src/modules/finances/domain/entities/finance.entity';
import { getMapperToken } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { FinanceTypeEnum } from '../../../../../../src/modules/finances/domain/enums/finance-type.enum';
import { FinanceListDto } from '../../../../../../src/modules/finances/application/dto/finance-list.dto';

describe('FindFinanceUseCase', () => {
  let useCase: FindFinanceUseCase;
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
        FindFinanceUseCase,
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

    useCase = module.get<FindFinanceUseCase>(FindFinanceUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('deve encontrar uma finança pelo id e retornar o DTO', async () => {
      const financeId = 1;
      const finance = new Finance({
        id: financeId,
        type: FinanceTypeEnum.INCOME,
        amount: 100,
        description: 'Test Finance',
        date: new Date(),
      });

      const financeListDto: FinanceListDto = {
        id: financeId,
        type: FinanceTypeEnum.INCOME,
        amount: 100,
        description: 'Test Finance',
        date: new Date(),
        created: undefined,
        updated: undefined
      };

      financeRepository.findById.mockResolvedValue(finance);
      mapper.map.mockReturnValue(financeListDto);

      const result = await useCase.execute(financeId);

      expect(financeRepository.findById).toHaveBeenCalledWith(financeId);
      expect(mapper.map).toHaveBeenCalledWith(finance, Finance, FinanceListDto);
      expect(result).toBe(financeListDto);
    });

    it('deve retornar null se a finança não for encontrada', async () => {
      const financeId = 999;

      financeRepository.findById.mockResolvedValue(null);
      mapper.map.mockReturnValue(null);

      const result = await useCase.execute(financeId);

      expect(financeRepository.findById).toHaveBeenCalledWith(financeId);
      expect(mapper.map).toHaveBeenCalledWith(null, Finance, FinanceListDto);
      expect(result).toBeNull();
    });

    it('deve lançar um erro se a busca no repositório falhar', async () => {
      const financeId = 1;
      const error = new Error('Database error');

      financeRepository.findById.mockRejectedValue(error);

      await expect(useCase.execute(financeId)).rejects.toThrow(error);
      expect(financeRepository.findById).toHaveBeenCalledWith(financeId);
    });
  });
});
