import {AutoMap} from "@automapper/classes";

export class Finance {
    @AutoMap() public id: number;
    @AutoMap() public userId: number;
    @AutoMap() public amount: number;
    @AutoMap() public description: string;
    @AutoMap() public date: Date;
    @AutoMap() public createdAt?: Date;
    @AutoMap() public updatedAt?: Date;
    @AutoMap() public isDeleted: boolean = false;
    @AutoMap(() => Date) public deletedAt?: Date;

    constructor(partial: Partial<Finance>) {
        Object.assign(this, partial);
    }
}
