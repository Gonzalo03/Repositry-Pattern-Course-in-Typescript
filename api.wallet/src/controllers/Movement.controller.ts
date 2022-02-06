import { GET, POST, PUT, route } from "awilix-express";
import { Request, Response } from "express";
import { BaseController } from "../common/controllers/base.controller";
import { MovementCreateDto } from "../dtos/MovementDto";
import { MovementService } from "../services/Movement.ser";

@route('/movements')
export class MovementController extends BaseController {
    constructor(private readonly movementService: MovementService) { super() }

    @GET()
    public async all(req: Request ,res: Response){

        try{
            res.send(await this.movementService.all())
        }catch (error){
            this.handleException(error, res)
        }
    }

    @route('/:id')
    @GET()
    public async find(req: Request ,res: Response){
        try {
            
            const id = parseInt(req.params.id)

            res.send(await this.movementService.find(id))

        } catch (error) {
            
            this.handleException(error, res)

        }
    }

    @POST()
    public async store(req: Request ,res: Response){
        
        try {
                
            const data = {
                type : req.body.type,
                user_id : req.body.user_id,
                amount: req.body.amount,
            } as MovementCreateDto

            await this.movementService.store(data)

            res.send()
        } catch (error) {

            this.handleException(error, res)
            
        }

    }
} 