import db from '../database/connection'


export default class IndexUserService{
  public async execute(): Promise<any>{

    const users = await db('users')
      .count('* as total')    

    return users
  }
}