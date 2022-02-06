import { User } from "../entities/User";

export interface AuthRepository {

    saveNewUser(newUser: User): Promise<void>
    findUserByEmail(email: string): Promise<User | null>

}