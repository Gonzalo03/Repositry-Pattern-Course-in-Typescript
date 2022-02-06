import { db } from "../../../../common/persistence/mock.persistence";
import { Balance } from "../../domain/balance";
import { BalanceRepository } from "../../BalanceRepository";

export class BalanceMockRepository implements BalanceRepository {
    
    table = db.balance as Balance[]
    identity = db.identitys.balance
    
    public async find(id: number): Promise<Balance | null> {
        
        const result =  this.table.find(b=>b.id===id)

        if(!result) return null

        return result

    }

    public async findByUserId(userId: number): Promise<Balance | null> {
       
        const result = this.table.find(b=>b.user_id===userId)

        if(!result) return null

        return result

    }

    public async all(): Promise<Balance[]> {
    
        return this.table;

    }

    public async store(entry: Balance): Promise<void> {     
        
        this.table.push({
            ...entry,
            id: ++this.identity

        })

    }

    public async update(entry: Balance): Promise<void> {

        const originalEntry = this.table.find(b=>b.id===entry.id)

        if(originalEntry){
            
            originalEntry.user_id = entry.user_id
            originalEntry.amount = entry.amount
            originalEntry.updated_at = entry.updated_at
        }
    }

    public async remove(id: number): Promise<void> {
  
        this.table = this.table.filter(b=>b.id===id)

    }
}