import { Module } from '@nestjs/common';
import { FinancesController } from './presentation/finances.controller';
import {FinancesProfile} from "./infra/mappers/finances.profile";
import {CreateFinanceUseCase} from "./application/use-case/create-finances.usecase";
import {ListFinancesUseCase} from "./application/use-case/list-finances.usecase";
import {UpdateFinanceUseCase} from "./application/use-case/update-finances.usecase";
import {RemoveFinanceUseCase} from "./application/use-case/remove-finances.usecase";
import {FindFinanceUseCase} from "./application/use-case/find-finances.usecase";
import {FinanceRepository} from "./infra/repositories/finance.repository";

@Module({
  controllers: [FinancesController],
  providers: [
      CreateFinanceUseCase,
      ListFinancesUseCase,
      UpdateFinanceUseCase,
      RemoveFinanceUseCase,
      ListFinancesUseCase,
      FindFinanceUseCase,
      FinancesProfile, {
    provide: 'IFinanceRepository', useClass: FinanceRepository,
  }]
})
export class FinancesModule {}
