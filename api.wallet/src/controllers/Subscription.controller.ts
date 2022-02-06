import { GET, POST, PUT, route } from "awilix-express";
import { Request, Response } from "express";
import { BaseController } from "../common/controllers/base.controller";
import { SubscriptionCreateDto } from "../dtos/SubcriptionDto";
import { SusbcriptionService } from "../services/Susbcription.ser";

@route('/subscription')
export class SubscriptionController extends BaseController {
    constructor(private readonly subscriptionService: SusbcriptionService) { super() }

    @GET()
    public async all(req: Request ,res: Response){

        try{
            res.send(await this.subscriptionService.all())
        }catch (error){
            this.handleException(error, res)
        }
    }

    @route('/:id')
    @GET()
    public async find(req: Request ,res: Response){
        try {
            
            const id = parseInt(req.params.id)

            res.send(await this.subscriptionService.find(id))

        } catch (error) {
            
            this.handleException(error, res)

        }
    }

    @POST()
    public async store(req: Request ,res: Response){
        
        try {
                
            const data = {
                user_id : req.body.user_id,
                code: req.body.code,
                amount: req.body.amount,
                cron: req.body.cron
            } as SubscriptionCreateDto

            await this.subscriptionService.store(data)

            res.send()
        } catch (error) {

            this.handleException(error, res)
            
        }

    }

    @route('/:id')
    @PUT()
    public async update(req: Request ,res: Response){

        try {
                
            const id = parseInt(req.params.id)

            const subscription = {
                user_id : req.body.user_id,
                code: req.body.code,
                amount: req.body.amount,
                cron: req.body.cron
            } as SubscriptionCreateDto

            await this.subscriptionService.update(id, subscription)

            res.send()
        } catch (error) {
            
            this.handleException(error, res)

        }

    }

    @route('/:id')
    @PUT()
    public async remove(req: Request ,res: Response){
        try {
                
            const id = parseInt(req.params.id)

            await this.subscriptionService.remove(id)

            res.send()
        } catch (error) {
            
            this.handleException(error, res)

        }
    }
} 