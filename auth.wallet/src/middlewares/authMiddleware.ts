import { NextFunction, Request, Response } from "express";
import { AuthRepository } from "../services/domain/contracts/AuthRepository";
import { AuthMysqlRepositry } from "../services/repositories/AuthMysqlRepository";

function authMiddleware(authDao: AuthRepository){

    return {

        checkUser: async (req: Request, res: Response, next: NextFunction)=>{

            const { email, password } = req.body
    
            if(!email || !password) return res.status(400).json({mssg: "the request must be contain email and password"})
    
            const existingUser = await authDao.findUserByEmail(req.body.email)
    
            if(existingUser) return res.status(400).json({mssg: "User alredy exists"})
    
            res.locals.email = email
            res.locals.password = password
            next();
    
        },


    }

}

export default authMiddleware(new AuthMysqlRepositry())