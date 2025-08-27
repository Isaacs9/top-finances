import {AutoMap} from "@automapper/classes";
import {FinanceTypeEnum} from "../../domain/enums/finance-type.enum";

export class FinanceListDto {
    @AutoMap() id: number;
    @AutoMap() type: FinanceTypeEnum;
    @AutoMap() amount: number;
    @AutoMap() description: string;
    @AutoMap() date: Date;
    @AutoMap() created?: Date;
    @AutoMap() updated?: Date;
}
