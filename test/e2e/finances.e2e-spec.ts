import { Test, TestingModule } from '@nestjs/testing';
import { INestMicroservice } from '@nestjs/common';
import { Transport, ClientProxyFactory, ClientProxy } from '@nestjs/microservices';
import { GenericContainer } from 'testcontainers';
import {knex, Knex} from 'knex';
import {firstValueFrom, lastValueFrom} from "rxjs";
import {TestAppModule} from "../../src/test.module";

describe('Finances Microservice (e2e) - Knex + Testcontainers', () => {
    let app: INestMicroservice;
    let client: ClientProxy;
    let db: Knex;
    let container;

    beforeAll(async () => {
        process.env.NODE_ENV = 'test';
        container = await new GenericContainer('postgres')
            .withEnvironment({
                POSTGRES_USER: 'test',
                POSTGRES_PASSWORD: 'test',
                POSTGRES_DB: 'testdb',
            })
            .withExposedPorts(5432)
            .start();

        const mappedPort = container.getMappedPort(5432);
        console.log(`Postgres container started on port ${mappedPort}`);
        console.log(`Postgres container started on port ${container.getHost()}`);
        db = knex({
            client: 'pg',
            connection: {
                host: container.getHost(),
                port: mappedPort,
                user: 'test',
                password: 'test',
                database: 'testdb',
            },
            searchPath: ['finances'],
            migrations: {
                directory: './src/infra/database/migrations',
                extension: 'ts',
            },
            seeds: {
                directory: './src/infra/database/seeds',
                extension: 'ts',
            }
        });

        await db.raw(`CREATE SCHEMA IF NOT EXISTS finances;`);
        await db.migrate.latest();
        await db.seed.run();

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [TestAppModule.forRoot(db)],
        }).compile();

        app = moduleFixture.createNestMicroservice({
            transport: Transport.TCP,
            options: { host: '127.0.0.1', port: 8877 },
        });

        await app.listen();

        client = ClientProxyFactory.create({ transport: Transport.TCP, options: { host: '127.0.0.1', port: 8877 } });
        await client.connect();
    });

    afterAll(async () => {
        if (client) await client.close();
        if (app) await app.close();
        if (db) await db.destroy();
        if (container) await container.stop();
    });

    it('deve criar uma finança', async () => {
        const userId= await lastValueFrom(client.send({cmd: 'finances.create'}, {type: "INCOME", amount: 1.11, description: "finança"}))

        expect(userId).toBeDefined();
    });

    it('deve atualizar uma finança', async () => {
        const finance = await db('finances').where({type: "INCOME"}).first();
        const data= await lastValueFrom(client.send({cmd: 'finances.update'}, {id: finance.id, patch: {
                type: 'EXPENSE'
            }}))

        expect(data).toBeDefined();
        expect(data.success).toBe(true);
    });


    it('deve listar as finanças', async () => {
        const res = await client.send({ cmd: 'finances.list' }, {}).toPromise();
        expect(Array.isArray(res)).toBe(true);
        expect(res.length).toBeGreaterThan(0);
    });

    it('deve deletar uma finança', async () => {
        const finance = await db('finances').where({type: "EXPENSE"}).first();
        const data= await lastValueFrom(client.send({cmd: 'finances.remove'}, {id: finance.id}))

        expect(data).toBeDefined();
        expect(data.success).toBe(true);
    });
});
