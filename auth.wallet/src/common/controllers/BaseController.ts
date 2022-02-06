import { Response } from "express";

import { ApplicationException } from "../exceptions/ApplicationException";

export default abstract class BaseController{

    handleException(err: any, res: Response){

        if(err instanceof ApplicationException){

            res.status(err.status).send(err.message);

        }else{

            throw new Error(err);

        }

    }

}
