import { route, POST, } from "awilix-express";
import { Request, Response } from "express";
import BaseController from "../common/controllers/BaseController";
import AuthService from "../services/AuthService";

import { UserCreateDto } from "../dtos/UserCreateDto";

@route('/auth')
export class AuthController extends BaseController{

    constructor(private readonly authService: AuthService){
        super()
    }

    @route('/register')
    @POST()
    public async register(req: Request, res: Response){
    
        const newUser: UserCreateDto = {
            email: res.locals.email,
            password: res.locals.password
        }

        await this.authService.register(newUser)

        res.json({newUser})

    }

    @route('/login')
    @POST()
    public async login(req: Request, res: Response){

        const userCredentials: UserCreateDto = {
            email: req.body.email,
            password: req.body.password
        }

        try {
            const token = await this.authService.login(userCredentials)    

            res.json(token)
            
        } catch (error) {
            this.handleException(error, res)
        }

    }

}