import {IFinanceRepository} from "../../domain/finance.repository";
import {Finance} from "../../domain/entities/finance.entity";
import {Inject} from "@nestjs/common";
import {Mapper} from "@automapper/core";
import {InjectMapper} from "@automapper/nestjs";
import {FinanceListDto} from "../dto/finance-list.dto";

export class FindFinanceUseCase {
    constructor(@Inject('IFinanceRepository') private readonly repo: IFinanceRepository,
                @InjectMapper() private readonly mapper: Mapper) {}

    async execute(id: number): Promise<FinanceListDto> {
        const finances = await this.repo.findById(id);
        return this.mapper.map(finances, Finance, FinanceListDto);
    }
}
