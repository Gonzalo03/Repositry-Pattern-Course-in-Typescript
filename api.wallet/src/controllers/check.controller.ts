import { Request, Response } from "express";
import { GET, route } from "awilix-express";
import DefaultService from "../services/default.ser";

@route('/check')
export class CheckController {

    constructor(private readonly defaultService: DefaultService){}

    
    @GET()
    public check(req: Request, res: Response) {

        res.json({
            app_env : process.env.APP_ENV,
            node_env : process.env.NODE_ENV
        })

    }

    @route('/get')
    @GET()
    public get(req: Request, res: Response){

        res.send(this.defaultService.get())

    }
}