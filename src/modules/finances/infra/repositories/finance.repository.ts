import {InjectKnex, Knex} from "nestjs-knex";
import {Injectable} from "@nestjs/common";
import {IFinanceRepository} from "../../domain/finance.repository";
import {Finance} from "../../domain/entities/finance.entity";

@Injectable()
export class FinanceRepository implements IFinanceRepository {

  constructor(@InjectKnex() private readonly knex: Knex) {
  }

  async findById(id: number) {
    const user = await this.knex<Finance>('finance').where({id}).first();
    if (user) {
      return user;
    }
    return null;
  }

  async list() {
    const rows = await this.knex<Finance>('users').select('*')
        .orderBy('id', 'asc');
    return rows.map(r => new Finance(r));
  }

  async create(finance: Finance) {
    const [user] = await this.knex<Finance>('finance')
        .insert({
          ...finance,
          created: new Date(),
        })
        .returning(['id']);
    return user.id;
  }

  async update(id: number, patch: Partial<Finance>) {
    const dbPatch: any = {...patch};
    dbPatch.updatedAt = new Date();
    await this.knex<Finance>('users').where({id}).update(dbPatch);
  }

  async softDelete(id: number) {
    await this.knex<Finance>('users').where({id}).update({
      isDeleted: true,
      deletedAt: new Date()
    });
  }
}
