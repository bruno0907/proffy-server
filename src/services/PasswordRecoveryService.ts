import db from '../database/connection'
import * as crypto from 'crypto'
import * as bcrypt from 'bcryptjs'

import mailer from '../modules/mailer'

interface UserDataProps{
  userEmail: string;  
}

export default class PasswordRecoveryService{
  public async execute(userEmail: UserDataProps): Promise<any>{        
    const newPassword = crypto.randomBytes(4).toString('hex')
    const password = await bcrypt.hash(newPassword, 8)
    const data = await db('users')
      .where({ email: userEmail }) 
      .update({ password }, [
        'name',
        'email'
      ])      
    if(!data){
      throw new Error('User not found!')
    }    
    const { name, email } = data[0]  
    mailer(name, email, newPassword)
    return {
      name,
      email,
      newPassword 
    }    
  }
}