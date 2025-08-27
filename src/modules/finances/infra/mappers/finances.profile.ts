import {createMap, Mapper} from '@automapper/core';
import {AutomapperProfile, InjectMapper} from '@automapper/nestjs';
import {Injectable} from '@nestjs/common';
import {Finance} from "../../domain/entities/finance.entity";
import {CreateFinanceDto} from "../../application/dto/create-finance.dto";
import {UpdateFinanceDto} from "../../application/dto/update-finance.dto";
import {FinanceListDto} from "../../application/dto/finance-list.dto";

@Injectable()
export class FinancesProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper: Mapper) => {

            createMap(mapper, CreateFinanceDto, Finance);
            createMap(mapper, UpdateFinanceDto, Finance);
            createMap(mapper, Finance, FinanceListDto);
        };
    }
}
