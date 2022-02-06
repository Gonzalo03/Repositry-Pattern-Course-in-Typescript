import { db } from '../../../../common/persistence/mock.persistence'
import { Subscription } from '../../domain/subscription';
import { SubscriptionRepository } from '../../SubscriptionRepository';

export default class SubscriptionMockRepository implements SubscriptionRepository{

    table = db.subscription as Subscription[]
    identity = db.identitys.subscription

    public async all(): Promise<Subscription[]>{

        return this.table

    }
    
    public async find (id: number): Promise<Subscription | null> {

        
        const result =  this.table.find(s=>s.id===id)

        if(!result) return null

        return result


    }

    public async findByUserAndCode(user_id: number, code: string): Promise<Subscription | null> {
        
        const result =  this.table.find(s=>(s.user_id===user_id && s.code === code))

        if(!result) return null

        return result

    }

    public async store(entry: Subscription){

        this.table.push({
            ...entry,
            id: ++this.identity

        })
    }

    public async update(entry: Subscription){

        const originalEntry = this.table.find(s=>s.id===entry.id)

        if(originalEntry){
            
            originalEntry.user_id = entry.user_id
            originalEntry.amount = entry.amount
            originalEntry.updated_at = entry.updated_at
        }
    }

    

    public async remove(id: number){

       this.table = this.table.filter(s=>s.id===id)
    }

}   