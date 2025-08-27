import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import {CreateFinanceUseCase} from "../application/use-case/create-finances.usecase";
import {ListFinancesUseCase} from "../application/use-case/list-finances.usecase";
import {UpdateFinanceUseCase} from "../application/use-case/update-finances.usecase";
import {RemoveFinanceUseCase} from "../application/use-case/remove-finances.usecase";
import {FindFinanceUseCase} from "../application/use-case/find-finances.usecase";

@Controller('finances')
export class FinancesController {
  constructor(
      private readonly createFinanceUseCase: CreateFinanceUseCase,
      private readonly updateFinanceUseCase: UpdateFinanceUseCase,
      private readonly removeFinanceUseCase: RemoveFinanceUseCase,
      private readonly listFinancesUseCase: ListFinancesUseCase,
      private readonly findFinanceUseCase: FindFinanceUseCase,
  ) {
  }

  @Get()
  async list() {
    return this.listFinancesUseCase.execute();
  }

  @Post()
  async create(@Body() body:any) {
    return await this.createFinanceUseCase.execute(body);
  }

  @Get(':id')
  async find(@Param('id') id:string) {
    return this.findFinanceUseCase.execute(Number(id));
  }

  @Put(':id')
  async update(@Param('id') id:string, @Body() body:any) {
    await this.updateFinanceUseCase.execute(Number(id), body);
    return { success: true };
  }

  @Delete(':id')
  async remove(@Param('id') id:string) {
    await this.removeFinanceUseCase.execute(Number(id));
    return { success: true };
  }
}
