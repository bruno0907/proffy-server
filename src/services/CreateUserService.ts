import db from '../database/connection'

import { hash } from 'bcryptjs'

interface CreateUserProps{
  name: string;
  surname: string;
  email: string;
  password: string;
  password_confirm: string;
}

export default class CreateUserService{

  public async execute({
    name,
    surname,
    email,
    password,
    password_confirm
  }: CreateUserProps): Promise<any> {

    try {
      if(!name || !email || !password || !password_confirm){
        throw new Error('All fields are required')
      }
  
      if(password !== password_confirm){
        throw new Error('Passwords dont match!')
      }
  
      const emailExists = await db('users')
        .where('users.email', '=', email)
        .first()
  
      if(emailExists){
        throw new Error('The email you provided is already in use')
      }
  
      const hashedPassword = await hash(password, 8)
  
      const createUser = await db('users').insert({
        name,
        surname,
        email,
        password: hashedPassword
      })

      return createUser

    } catch (error) {
      throw new Error('Cannot register new user')      
    }    
  }
}
