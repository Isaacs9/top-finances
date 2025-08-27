import { Test, TestingModule } from '@nestjs/testing';
import { RemoveFinanceUseCase } from '../../../../../../src/modules/finances/application/use-case/remove-finances.usecase';
import { IFinanceRepository } from '../../../../../../src/modules/finances/domain/finance.repository';

describe('RemoveFinanceUseCase', () => {
  let useCase: RemoveFinanceUseCase;
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
        RemoveFinanceUseCase,
        {
          provide: 'IFinanceRepository',
          useValue: financeRepository,
        },
      ],
    }).compile();

    useCase = module.get<RemoveFinanceUseCase>(RemoveFinanceUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('deve remover (soft delete) uma finança pelo id', async () => {
      const financeId = 1;

      financeRepository.softDelete.mockResolvedValue();

      await useCase.execute(financeId);

      expect(financeRepository.softDelete).toHaveBeenCalledWith(financeId);
    });

    it('deve lançar um erro se a remoção no repositório falhar', async () => {
      const financeId = 1;
      const error = new Error('Database error');

      financeRepository.softDelete.mockRejectedValue(error);

      await expect(useCase.execute(financeId)).rejects.toThrow(error);
      expect(financeRepository.softDelete).toHaveBeenCalledWith(financeId);
    });
  });
});
