import bcrypt from 'bcrypt';
import { AuthRepository } from "./domain/contracts/AuthRepository";

import { UserCreateDto } from "../dtos/UserCreateDto";
import { User } from "./domain/entities/User";
import { ApplicationException } from '../common/exceptions/ApplicationException';
import { ITokenManager } from "./libs/TokenManager";


export default class AuthService {
    
    private salt: string

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly tokenManager: ITokenManager){}

    public async register(newUser: UserCreateDto){

        newUser.password = await this.hashPassword(newUser.password)

        this.authRepository.saveNewUser(newUser as User)

    }

    public async login(user: UserCreateDto){

        const userFound = await this.authRepository.findUserByEmail(user.email)

        if(!userFound) throw new ApplicationException('User not found', 404);
        
        const match = await this.comparePassword(user.password, userFound.password)
        
        if(!match) throw new ApplicationException('credentials are wrong', 400);

        const token = await this.tokenManager.signToken(user.email)

        return {token};

    }

    private async hashPassword(password: string): Promise<string> {
        this.salt = await bcrypt.genSalt(8)
        return await bcrypt.hash(password, this.salt)
    }
    private async comparePassword(plainPassword: string, hashPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashPassword)
    }
}