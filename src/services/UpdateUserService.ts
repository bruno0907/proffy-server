import db from '../database/connection'

interface UpdateUserProps{  
  id: number,
  avatar: string;
  name: string;
  surname: string;
  email: string;
  whatsapp: string;
  bio: string;
}  

export default class UpdateUserService{

  public async execute({  
    id,      
    avatar,
    name,
    surname, 
    email,
    whatsapp,
    bio, 
  }): Promise<any> {  

  const updatedUsers = await db<UpdateUserProps>('users')
    .where({ id })
    .update({  
      avatar,           
      name,
      surname,
      email,
      whatsapp,
      bio,        
    }) 

  if(updatedUsers){
    return updatedUsers
    
    } else {
      throw new Error('An error has ocurried while updating the user')
    }
  }
}
