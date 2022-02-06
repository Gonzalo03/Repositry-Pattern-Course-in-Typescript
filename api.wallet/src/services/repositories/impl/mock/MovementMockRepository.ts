import { db } from '../../../../common/persistence/mock.persistence'
import { Movement } from "../../domain/movement";
import { MovementRepository } from "../../MovementRepository";

export class MovementMockRepository implements MovementRepository{
    
    table = db.movement as Movement[]
    identity = db.identitys.movement

    public async find(id: number): Promise<Movement | null> {
    
        const result =  this.table.find(m=>m.id===id)

        if(!result) return null

        return result

  
    }
   
    public async all(): Promise<Movement[]> {
        
        return this.table;

    }
    public async store(entry: Movement): Promise<void> {
     
        this.table.push({
            ...entry,
            id: ++this.identity

        })

    }
    public async remove(id: number): Promise<void> {
        
        this.table = this.table.filter(m=>m.id===id)

    }

    

}