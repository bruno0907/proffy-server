import db from '../database/connection'

export default class UpdateAvatarService{
  async execute({
    id,
    avatar
  }){

    if(!id || !avatar){
      throw new Error('Missing id or avatar on request')
    }    

    const user = await db('users')
      .where({id: id})
      .first()
      
    if(!user){
      throw new Error('User not fount')
    } 

    await db('users')
      .where({id: id})
      .update({avatar})

      return avatar
    }
}