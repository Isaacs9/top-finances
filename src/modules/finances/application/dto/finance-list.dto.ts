import {AutoMap} from "@automapper/classes";

export class FinanceListDto {
    @AutoMap() id: number;
    @AutoMap() userId: number;
    @AutoMap() amount: number;
    @AutoMap() description: string;
    @AutoMap() date: Date;
    @AutoMap() createdAt?: Date;
    @AutoMap() updatedAt?: Date;
}
