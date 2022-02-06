process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.APP_ENV = process.env.APP_ENV || "development";

import dotenv from 'dotenv';
dotenv.config({
    path : `${__dirname}/../envs/${process.env.APP_ENV}.env`
});

import express, { Application } from 'express';

import { loadControllers } from 'awilix-express';

import loadContainer from './io.config';

const app: Application = express();

loadContainer(app);

app.use(express.json());

app.use(loadControllers(
    'controllers/*.ts',
    { cwd : __dirname }
));

export default app;