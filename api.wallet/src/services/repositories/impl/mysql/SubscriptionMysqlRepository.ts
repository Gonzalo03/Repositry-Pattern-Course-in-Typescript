import connection from '../../../../common/persistence/mysql.persistence'
import { Subscription } from '../../domain/subscription';
import { SubscriptionRepository } from '../../SubscriptionRepository';

export default class SubscriptionMYSQLRepository implements SubscriptionRepository{

    public async all(): Promise<Subscription[]>{

        const [result] = await connection.query('SELECT * FROM wallet_subscription');

        return result as Subscription[];

    }
    
    public async find (id: number): Promise<Subscription | null> {

        const [result]: any[] = await connection.query('SELECT * FROM wallet_subscription WHERE id= ?', [id])

        
        if(!result.length) return null;

        return result[0] as Subscription

    }

    public async findByUserAndCode(user_id: number, code: string): Promise<Subscription | null> {
        
        const [result]: any[] = await connection.query(`
        SELECT * FROM wallet_subscription
        WHERE 
        user_id = ?
        and
        code = ?`, [user_id, code])
        
        if(!result.length) return null;

        return result[0] as Subscription;

    }

    public async store(entry: Subscription){

        await connection.execute(`INSERT INTO wallet_subscription(user_id, code, amount, cron, created_at) VALUES(?, ?, ?, ?, ?)`,
        [entry.user_id, entry.code, entry.amount, entry.cron, new Date()])
    }

    public async update(entry: Subscription){

        await connection.execute(`
        UPDATE wallet_subscription
        SET 
            user_id = ?,
            code = ?,
            amount = ?,
            cron = ?,
            updated_at = ?
        WHERE id = ?`,
            [entry.user_id, entry.code, entry.amount, entry.cron, new Date(), entry.id])
    }

    

    public async remove(id: number){

        await connection.execute(`
        DELETE FROM wallet_subscription
        WHERE id = ?`,
            [id])
    }

}