import db from '../database/connection'
import { hash } from 'bcryptjs'

export default class CreateUserService{
  public async execute({
    email,
    password,
    password_confirm
  }): Promise<any> {
    if(!email || !password || !password_confirm){
      throw new Error('All fields are required')
    }
    if(password !== password_confirm){
      throw new Error('Passwords dont match!')
    }
    const emailExists = await db('users')
      .where({ email })
      .first()
    if(!emailExists){
      throw new Error('Provided email does not exists')
    }
    const hashedPassword = await hash(password, 8)
    const updatePassword = await db('users')
      .where({ email })
      .update({
        password: hashedPassword
      })
    if(updatePassword){
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
