import connector from "../../../../common/persistence/postgres-persistence";
import { Balance } from "../../domain/balance";
import { BalanceRepository } from "../../BalanceRepository";

export class BalancePostgresRepository implements BalanceRepository {
    public async find(id: number): Promise<Balance | null> {
        return await connector.oneOrNone<Balance>(
            'SELECT * FROM wallet_balance WHERE id = $1',
            [id]
        );
    }

    public async findByUserId(userId: number): Promise<Balance | null> {
       return await connector.oneOrNone<Balance>(
            'SELECT * FROM wallet_balance WHERE user_id = $1',
            [userId]
        );
    }

    public async all(): Promise<Balance[]> {
        return await connector.many<Balance>(
            'SELECT * FROM wallet_balance ORDER BY id DESC'
        );
    }

    public async store(entry: Balance): Promise<void> {     
        await connector.none(
            'INSERT INTO wallet_balance(user_id, amount, created_at) VALUES($1, $2, $3)',
            [entry.user_id, entry.amount, new Date()]
        );
    }

    public async update(entry: Balance): Promise<void> {

        await connector.none(
            'UPDATE wallet_balance SET user_id = $1, amount = $2, updated_at = $3 WHERE id = $4',
            [entry.user_id, entry.amount, new Date(), entry.id]
        );
    }

    public async remove(id: number): Promise<void> {
        await connector.none(
            'DELETE FROM wallet_balance WHERE id = $1',
            [id]
        );
    }
}