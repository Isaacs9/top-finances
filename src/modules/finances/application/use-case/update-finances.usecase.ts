import {IFinanceRepository} from "../../domain/finance.repository";
import {Finance} from "../../domain/entities/finance.entity";
import {Inject} from "@nestjs/common";
import {InjectMapper} from "@automapper/nestjs";
import {Mapper} from "@automapper/core";
import {UpdateFinanceDto} from "../dto/update-finance.dto";

export class UpdateFinanceUseCase {
    constructor(@Inject('IFinanceRepository') private readonly repo: IFinanceRepository,
                @InjectMapper() private readonly mapper: Mapper) {}

    async execute(id: number, patch: Partial<UpdateFinanceDto>): Promise<void> {
        const finance = this.mapper.map(patch, UpdateFinanceDto, Finance);
        await this.repo.update(id, finance);
    }
}
