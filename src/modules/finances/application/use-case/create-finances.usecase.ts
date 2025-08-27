import {IFinanceRepository} from "../../domain/finance.repository";
import {Finance} from "../../domain/entities/finance.entity";
import {Inject} from "@nestjs/common";
import {CreateFinanceDto} from "../dto/create-finance.dto";
import {Mapper} from "@automapper/core";
import {InjectMapper} from "@automapper/nestjs";

export class CreateFinanceUseCase {
    constructor(@Inject('IFinanceRepository') private readonly repo: IFinanceRepository,
                @InjectMapper() private readonly mapper: Mapper) {}

    async execute(data: Partial<Finance>): Promise<number> {
        const finance = this.mapper.map(data, CreateFinanceDto, Finance);
        return await this.repo.create(finance);
    }
}
