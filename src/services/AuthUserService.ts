import db from '../database/connection'

import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface UserAuthProps{
  email: string;
  password: string;
}

interface UserResponseProps{
  userData: {
    id: string;
    name: string;
    surname: string;
    password: string;
    email: string;
    avatar: string;
    whatsapp: string;
    bio: string;  
  };
  token: string;
}

export default class AuthUserService{
  public async execute({ email, password }: UserAuthProps): Promise<UserResponseProps>{
    
    if(!email && !password){
      throw new Error('You must inform your e-mail and/or your password to SignIn')      
    }    
      const userData = await db('users')
        .where('users.email', '=', email)
        .first()        

    if(!userData){
      throw new Error('User not found. If you dont have an account consider SignUp to us')
    }

    const doesPasswordsMatch = await compare(password, userData.password)

    if(!doesPasswordsMatch){
      throw new Error('Your email/password is wrong. Please verify your data and try again. If you dont have an account consider SignUp to us')
    }

    const token = sign({}, process.env.SECRET_KEY, {
      subject: userData.email,
      expiresIn: '1d',
    })

    return { userData, token: token}
  }
}