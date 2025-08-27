import {IFinanceRepository} from "../../domain/finance.repository";
import {Finance} from "../../domain/entities/finance.entity";
import {Inject} from "@nestjs/common";

export class ListFinancesUseCase {
    constructor(@Inject('IFinanceRepository') private readonly repo: IFinanceRepository) {}

    async execute(): Promise<Finance[]> {
        return await this.repo.list();
    }
}
