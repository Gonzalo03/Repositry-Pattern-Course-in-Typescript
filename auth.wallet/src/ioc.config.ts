import { asClass, createContainer } from "awilix";
import { scopePerRequest } from 'awilix-express';

import { Application } from "express";
import AuthService from "./services/AuthService";
import { TokenManager } from "./services/libs/TokenManager";
import { AuthMysqlRepositry } from "./services/repositories/AuthMysqlRepository";


export default (app: Application)=>{

    const Container = createContainer({
        injectionMode: 'CLASSIC'
    })

    Container.register({
        authRepository: asClass(AuthMysqlRepositry).scoped(),


        authService: asClass(AuthService).scoped(),


        tokenManager: asClass(TokenManager).scoped()
    })

    app.use(scopePerRequest(Container))

}