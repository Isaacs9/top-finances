import { Module } from '@nestjs/common';
import { KnexModule } from 'nestjs-knex';
import { FinancesModule } from './modules/finances/finances.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { Knex } from 'knex';

@Module({})
export class TestAppModule {
    static forRoot(testDb: Knex) {
        return {
            module: TestAppModule,
            imports: [
                KnexModule.forRoot({
                    config: testDb.client.config,
                }),
                AutomapperModule.forRoot({ strategyInitializer: classes() }),
                FinancesModule,
            ],
        };
    }
}
