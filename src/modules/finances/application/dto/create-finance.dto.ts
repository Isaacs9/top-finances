import {FinanceTypeEnum} from "../../domain/enums/finance-type.enum";
import {AutoMap} from "@automapper/classes";

export class CreateFinanceDto {
    @AutoMap() id: number;
    @AutoMap() type: FinanceTypeEnum;
    @AutoMap() amount: number;
    @AutoMap() description: string;
    @AutoMap() date: Date;
    @AutoMap() createdAt?: Date;
    @AutoMap() updatedAt?: Date;
}
