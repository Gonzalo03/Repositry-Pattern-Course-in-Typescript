import connection from '../../../../common/persistence/mysql.persistence'
import { Movement } from "../../domain/movement";
import { MovementRepository } from "../../MovementRepository";

export class MovementMYSQLRepository implements MovementRepository{
    
    public async find(id: number): Promise<Movement | null> {
    
        const [result]: any[] = await connection.query('SELECT * FROM wallet_movement WHERE id= ?', [id])

        if(!result.length) return null;

        return result[0] as Movement
    
    }
   
    public async all(): Promise<Movement[]> {
        
        const [result] = await connection.query('SELECT * FROM wallet_movement');

        return result as Movement[];

    }
    public async store(entry: Movement): Promise<void> {
        await connection.execute(`INSERT INTO wallet_movement(user_id, type, amount, created_at) VALUES(?, ?, ?, ?)`,
        [entry.user_id, entry.type, entry.amount, new Date()])
    }
  
    public async remove(id: number): Promise<void> {
        
        await connection.execute(`
        DELETE FROM wallet_movement
        WHERE id = ?`,
            [id])
    }

    

}