import {IFinanceRepository} from "../../domain/finance.repository";
import {Inject} from "@nestjs/common";

export class RemoveFinanceUseCase {
    constructor(@Inject('IFinanceRepository') private readonly repo: IFinanceRepository) {}

    async execute(id: number): Promise<void> {
        await this.repo.softDelete(id);
    }
}
