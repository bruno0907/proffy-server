import db from '../database/connection'

import { hash } from 'bcryptjs'

// interface ICreateUser{
//   name: string;
//   surname: string;
//   email: string;
//   password: string;
//   password_confirm: string;
// }

export default class CreateUserService{

  public async execute({
    name,
    surname,
    email,
    password,
    password_confirm
  }): Promise<any> {

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

    if(createUser){
      return {
        status: 'ok',
        statusCode: '201'
      }     
      } else {
        return {
          status: 'error',
          statusCude: '400'
        }
      }
    }

}
