import connection from '../../../../common/persistence/postgres-persistence'
import { Subscription } from '../../domain/subscription';
import { SubscriptionRepository } from '../../SubscriptionRepository';

export default class SubscriptionPostgresRepository implements SubscriptionRepository{

    public async all(): Promise<Subscription[]>{

        return await connection.many<Subscription>('SELECT * FROM wallet_subscription');

    }
    
    public async find (id: number): Promise<Subscription | null> {

       return await connection.oneOrNone<Subscription>('SELECT * FROM wallet_subscription WHERE id= $1', [id])

    }

    public async findByUserAndCode(user_id: number, code: string): Promise<Subscription | null> {
        return await connection.oneOrNone<Subscription>(`
        SELECT * FROM wallet_subscription
        WHERE 
        user_id = $1
        AND
        code = $2`, [user_id, code])
    }

    public async store(entry: Subscription){

        await connection.none(`INSERT INTO wallet_subscription(user_id, code, amount, cron, created_at) VALUES($1, $2, $3, $4, $5)`,
        [entry.user_id, entry.code, entry.amount, entry.cron, new Date()])
    }

    public async update(entry: Subscription){

        await connection.none(`
        UPDATE wallet_subscription
        SET 
            user_id = $1,
            code = $2,
            amount = $3,
            cron = $4,
            updated_at = $5
        WHERE id = $6`,
            [entry.user_id, entry.code, entry.amount, entry.cron, new Date(), entry.id])
    }

    

    public async remove(id: number){

        await connection.none(`
        DELETE FROM wallet_subscription
        WHERE id = $1`,
            [id])
    }

}   