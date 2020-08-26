import db from '../database/connection'

import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface UserAuthData{
  email: string;
  password: string;
}

interface IResponse{
  userData: {
    id: string;
    name: string;
    password: string;
    email: string;
    avatar: string;
    whatsapp: string;
    bio: string;  
  };
  token: string;
}

export default class AuthUserService{
  public async execute({ email, password }: UserAuthData): Promise<IResponse>{
    
    if(!email && !password){
      throw new Error('You must inform your e-mail and/or your password to SignIn')      
    }    
      const userData = await db('users')
        .where('users.email', '=', email)
        .first()

    if(!userData){
      throw new Error('Your email or password is wrong. Please verify your data and try again. If you dont have an account consider SignUp to us')
    }

    const doesPasswordsMatch = await compare(password, userData.password)

    if(!doesPasswordsMatch){
      throw new Error('Your email or password is wrong. Please verify your data and try again. If you dont have an account consider SignUp to us')
    }

    const token = sign({}, '31e5e375f621c075f481aec623259356', {
      subject: userData.email,
      expiresIn: '1d',
    })

    return { userData, token: token}
  }
}