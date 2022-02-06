import connection from '../../common/persistence/mysql.persistence';
import { AuthDao } from '../domain/contracts/dao/AuthDao';
import { User } from '../domain/entities/User';

export default class AuthMysqlDao implements AuthDao{

    public async findUser(email: string): Promise<User | null> {
        
        const [result]: any[] = await connection.query("SELECT * FROM auth_user WHERE email = ?", [email])

        if(!result.length) return null

        return result[0] as User

    }

}