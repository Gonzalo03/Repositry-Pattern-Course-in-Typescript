import { asClass, createContainer } from 'awilix';
import { scopePerRequest } from 'awilix-express';
import { Application } from 'express';

import DefaultService from './services/default.ser';
import { MovementService } from './services/Movement.ser';
import { BalanceMYSQLRepository } from './services/repositories/impl/mysql/BalanceMysqlRepository';
import { MovementMYSQLRepository } from './services/repositories/impl/mysql/MovementMysqlReposiory';
import SubscriptionMYSQLRepository from './services/repositories/impl/mysql/SubscriptionMysqlRepository';
import { BalancePostgresRepository } from './services/repositories/impl/postgres/BalancePostgresRepository';
import { MovementPostgresRepository } from './services/repositories/impl/postgres/MovementPostgresRepository';
import SubscriptionPostgresRepository from './services/repositories/impl/postgres/SubscriptionPostgresRepository';
import { SusbcriptionService } from './services/Susbcription.ser';

export default ( app: Application ) => {
    
    const Container = createContainer({
        injectionMode : 'CLASSIC'
    });
    
    Container.register({
        //service
        defaultService : asClass(DefaultService).scoped(),
        subscriptionService : asClass(SusbcriptionService).scoped(),
        movementService : asClass(MovementService).scoped(),
         //repositories
        // subcriptionMYSQLRepository : asClass(SubscriptionMYSQLRepository).scoped(),
        // movementMYSQLRepository : asClass(MovementMYSQLRepository).scoped(),
        // balanceMYSQLRepository : asClass(BalanceMYSQLRepository).scoped(),
        subcriptionPostgresRepository : asClass(SubscriptionPostgresRepository).scoped(),
        movementPostgresRepository : asClass(MovementPostgresRepository).scoped(),
        balancePostgresRepository : asClass(BalancePostgresRepository).scoped(),
    });

    app.use(scopePerRequest(Container));

};