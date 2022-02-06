import connection from '../../../../common/persistence/postgres-persistence'
import { Movement } from "../../domain/movement";
import { MovementRepository } from "../../MovementRepository";

export class MovementPostgresRepository implements MovementRepository{
    
    public async find(id: number): Promise<Movement | null> {
    
        return await connection.oneOrNone<Movement>('SELECT * FROM wallet_movement WHERE id= $1', [id])
  
    }
   
    public async all(): Promise<Movement[]> {
        
        return await connection.many<Movement>('SELECT * FROM wallet_movement');

    }
    public async store(entry: Movement): Promise<void> {
        await connection.none(`INSERT INTO wallet_movement(user_id, type, amount, created_at) VALUES($1, $2, $3, $4)`,
        [entry.user_id, entry.type, entry.amount, new Date()])
    }

    public async remove(id: number): Promise<void> {
        
        await connection.none(`
        DELETE FROM wallet_movement
        WHERE id = $1`,
            [id])
    }

    

}