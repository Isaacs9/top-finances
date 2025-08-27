import { Test, TestingModule } from '@nestjs/testing';
import { ListFinancesUseCase } from '../../../../../../src/modules/finances/application/use-case/list-finances.usecase';
import { IFinanceRepository } from '../../../../../../src/modules/finances/domain/finance.repository';
import { Finance } from '../../../../../../src/modules/finances/domain/entities/finance.entity';
import { FinanceTypeEnum } from '../../../../../../src/modules/finances/domain/enums/finance-type.enum';

describe('ListFinancesUseCase', () => {
  let useCase: ListFinancesUseCase;
  let financeRepository: jest.Mocked<IFinanceRepository>;

  beforeEach(async () => {
    financeRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      list: jest.fn(),
      update: jest.fn(),
      softDelete: jest.fn(),
    } as jest.Mocked<IFinanceRepository>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListFinancesUseCase,
        {
          provide: 'IFinanceRepository',
          useValue: financeRepository,
        },
      ],
    }).compile();

    useCase = module.get<ListFinancesUseCase>(ListFinancesUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('deve listar todas as finanças', async () => {
      const finances = [
        new Finance({
          id: 1,
          type: FinanceTypeEnum.INCOME,
          amount: 100,
          description: 'Income 1',
          date: new Date(),
        }),
        new Finance({
          id: 2,
          type: FinanceTypeEnum.EXPENSE,
          amount: 50,
          description: 'Expense 1',
          date: new Date(),
        }),
      ];

      financeRepository.list.mockResolvedValue(finances);

      const result = await useCase.execute();

      expect(financeRepository.list).toHaveBeenCalled();
      expect(result).toBe(finances);
      expect(result.length).toBe(2);
    });

    it('deve retornar uma lista vazia se não houver finanças', async () => {
      financeRepository.list.mockResolvedValue([]);

      const result = await useCase.execute();

      expect(financeRepository.list).toHaveBeenCalled();
      expect(result).toEqual([]);
      expect(result.length).toBe(0);
    });

    it('deve lançar um erro se a listagem do repositório falhar', async () => {
      const error = new Error('Database error');

      financeRepository.list.mockRejectedValue(error);

      await expect(useCase.execute()).rejects.toThrow(error);
      expect(financeRepository.list).toHaveBeenCalled();
    });
  });
});
