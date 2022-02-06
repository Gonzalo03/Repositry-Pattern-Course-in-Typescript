import { Response } from "express";
import { ApplicationException } from "../exception/ApplicationException";

export abstract class BaseController{

    handleException(err: any, res: Response){

        if(err instanceof ApplicationException){

            res.status(err.status).send(err.message);

        }else{

            throw new Error(err);

        }

    }

}
