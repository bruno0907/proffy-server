import db from '../database/connection'

interface UpdateAvatarProps{
  id: string;
  avatar: string;
}

export default class UpdateAvatarService{
  async execute({
    id,
    avatar
  }: UpdateAvatarProps): Promise<any>{
    try {
      if(!id || !avatar){
        throw new Error('Missing id or avatar on request')       
      }  
      const user = await db('users')
        .where({ id })
        .first()     
      if(!user){
        throw new Error('User not found')      
      }   
      const updatedUser = await db('users')
        .where({ id })
        .update({ avatar }, ['*']) 
      return updatedUser
    } catch (error) {
      throw new Error(error.message)
    }
  }
}