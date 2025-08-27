import { Knex } from 'knex';
export async function seed(knex: Knex): Promise<void> {
  const c = await knex('finances').count('* as cnt').first();
  if (c && Number((c as any).cnt) === 0) {
    await knex('finances').insert([
      { type: 'income', amount: 1000.00, description: 'Initial deposit', date: new Date().toISOString() },
      { type: 'expense', amount: 200.00, description: 'Office supplies', date: new Date().toISOString() }
    ]);
  }
}
