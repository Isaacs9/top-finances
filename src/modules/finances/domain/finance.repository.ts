import {Finance} from './entities/finance.entity';

export interface IFinanceRepository {
    list(): Promise<Finance[]>;

    findById(id: number): Promise<Finance | null>;

    create(finance: Partial<Finance>): Promise<number>;

    update(id: number, patch: Finance): Promise<void>;

    softDelete(id: number): Promise<void>;
}
