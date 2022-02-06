import connection from '../../common/persistence/mysql.persistence'
import { AuthRepository } from "../domain/contracts/AuthRepository";
import { User } from "../domain/entities/User";

export class AuthMysqlRepositry implements AuthRepository{


    public async saveNewUser(newUser: User): Promise<void> {
        
        connection.execute(`
        INSERT INTO auth_user(
            email,
            password,
            created_at
        )
        VALUES(?,?,?)
        `, [newUser.email, newUser.password, new Date()])

    }


    public async findUserByEmail(email: string): Promise<User | null> {
        
        const [result]: any[] = await connection.query('SELECT * FROM auth_user WHERE email = ?', [email])

        
        if(!result.length) return null

        return result[0] as User
    }

}