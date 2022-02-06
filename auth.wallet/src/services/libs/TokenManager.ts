import jwt from 'jsonwebtoken';
import { TokenPayload } from '../domain/value-object/TokenPayload.type';

export interface ITokenManager{

    signToken(email: string): Promise<string>;
    decodeToken(token: string): Promise<TokenPayload>;

}


export class TokenManager implements ITokenManager{


  

    public async signToken(email: string): Promise<string> {
        return jwt.sign({email}, process.env.JWT_SECRET_KEY as string,{
            expiresIn: process.env.JWT_EXPIRES_IN
        })
    }
    public async decodeToken(token: string): Promise<TokenPayload> {
        return await jwt.decode(token) as TokenPayload
    }




}