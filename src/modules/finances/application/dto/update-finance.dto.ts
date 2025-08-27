import {AutoMap} from "@automapper/classes";
import {FinanceTypeEnum} from "../../domain/enums/finance-type.enum";

export class UpdateFinanceDto {
    @AutoMap() id: number;
    @AutoMap() type: FinanceTypeEnum;
    @AutoMap() amount: number;
    @AutoMap() description: string;
    @AutoMap() date: Date;
    @AutoMap() createdAt?: Date;
    @AutoMap() updatedAt?: Date;
}
