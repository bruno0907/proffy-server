import db from '../database/connection'

interface UpdateAvatarProps{
  id: number;
  avatar: string;
}

export default class UpdateAvatarService{
  async execute({
    id,
    avatar
  }){

    if(!id || !avatar){
      throw new Error('Missing id or avatar on request')       
    }

    const user = await db<UpdateAvatarProps>('users')
      .where({ id })
      .first()   

    if(!user){
      throw new Error('User not found')      
    } 

    const updatedUser = await db<UpdateAvatarProps>('users')
      .where({ id })
      .update({ avatar }, ['*'])
    
    console.log(updatedUser)
    return updatedUser

  }
}