import { ApplicationException } from "../common/exception/ApplicationException";
import { SubscriptionCreateDto, SubscriptionUpdateDto } from "../dtos/SubcriptionDto";
import { Subscription } from "./repositories/domain/subscription";
import { SubscriptionRepository } from "./repositories/SubscriptionRepository";



export class SusbcriptionService {

    constructor(
        private readonly subcriptionPostgresRepository: SubscriptionRepository
    ){}


    public async all(): Promise<Subscription[]>{

        return this.subcriptionPostgresRepository.all();

    }
    
    public async find (id: number): Promise<Subscription | null> {

        const result = await this.subcriptionPostgresRepository.find(id)

        if(result) return result
        else throw new ApplicationException('Sub not found', 404)

    }

    public async store(entry: SubscriptionCreateDto){
        
        const originalEntry = await this.subcriptionPostgresRepository.findByUserAndCode(entry.user_id, entry.code)
        
        if(!originalEntry){

            await this.subcriptionPostgresRepository.store(entry as Subscription);

        }else{

            throw new ApplicationException('User subscription alredy exists', 404);

        }

    }

    public async update(id: number, entry: SubscriptionUpdateDto){

        const originalEntry = await this.subcriptionPostgresRepository.find(id)
        console.log(originalEntry)
        if(originalEntry){

            originalEntry.code = entry.code
            originalEntry.amount = entry.amount
            originalEntry.cron = entry.cron
        
            await this.subcriptionPostgresRepository.update(originalEntry)

        }else{

            throw new ApplicationException('Subscription not found')

        }

    }
    

    public async remove(id: number){

        await this.subcriptionPostgresRepository.remove(id)

    }

}