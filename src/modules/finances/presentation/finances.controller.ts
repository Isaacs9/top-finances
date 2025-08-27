import { Controller } from '@nestjs/common';
import {CreateFinanceUseCase} from "../application/use-case/create-finances.usecase";
import {ListFinancesUseCase} from "../application/use-case/list-finances.usecase";
import {UpdateFinanceUseCase} from "../application/use-case/update-finances.usecase";
import {RemoveFinanceUseCase} from "../application/use-case/remove-finances.usecase";
import {FindFinanceUseCase} from "../application/use-case/find-finances.usecase";
import {MessagePattern} from "@nestjs/microservices";

@Controller()
export class FinancesController {
  constructor(
      private readonly createFinanceUseCase: CreateFinanceUseCase,
      private readonly updateFinanceUseCase: UpdateFinanceUseCase,
      private readonly removeFinanceUseCase: RemoveFinanceUseCase,
      private readonly listFinancesUseCase: ListFinancesUseCase,
      private readonly findFinanceUseCase: FindFinanceUseCase,
  ) {
  }

  @MessagePattern({cmd: 'finances.list'})
  async list() {
    return this.listFinancesUseCase.execute();
  }

  @MessagePattern({cmd: 'finances.create'})
  async create(body: any) {
    return await this.createFinanceUseCase.execute(body);
  }

  @MessagePattern({cmd: 'finances.findByEmail'})
  async find(data: { id: string }) {
    return this.findFinanceUseCase.execute(Number(data.id));
  }

  @MessagePattern({cmd: 'finances.update'})
  async update(data: { id: number; patch: any }) {
    await this.updateFinanceUseCase.execute(Number(data.id), data.patch);
    return { success: true };
  }

  @MessagePattern({cmd: 'finances.remove'})
  async remove(data: { id: number }) {
    await this.removeFinanceUseCase.execute(Number(data.id));
    return { success: true };
  }
}
