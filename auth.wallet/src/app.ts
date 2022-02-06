process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.APP_ENV = process.env.APP_ENV || "development";

import { loadControllers } from 'awilix-express';
import dotenv from 'dotenv';
dotenv.config({
    path : `${__dirname}/../envs/${process.env.APP_ENV}.env`
});

import express, { Application } from "express";
import loadContainer from './ioc.config';
import authMiddleware from './middlewares/authMiddleware';

const app: Application = express()

app.use(express.json())

loadContainer(app)

app.use('/auth/register', authMiddleware.checkUser)

//JWT SUPPORT BY express-JWT
// app.use(expressJwt({ secret: process.env.JWT_SECRET_KEY as string, algorithms: ['HS256'] }))

app.use(loadControllers(
    'controllers/*.ts',
    { cwd : __dirname }
))

export default app;

