import { Knex } from 'knex';
export async function up(knex: Knex): Promise<void> {
  const exists = await knex.schema.hasTable('finances');
  if (!exists) {
    await knex.schema.createTable('finances', (t) => {
      t.increments('id').primary();
      t.string('type').notNullable(); // income | expense
      t.decimal('amount', 14, 2).notNullable();
      t.string('description').nullable();
      t.timestamp('date').notNullable().defaultTo(knex.fn.now());
      t.timestamp('createdAt').defaultTo(knex.fn.now());
      t.timestamp('updatedAt').defaultTo(knex.fn.now());
      t.boolean('isDeleted').notNullable().defaultTo(false);
      t.timestamp('deletedAt').nullable();
    });
  }
}
export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('finances');
}
