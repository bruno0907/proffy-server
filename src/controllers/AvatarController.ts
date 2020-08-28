import { Request, Response } from 'express'

import UpdateAvatarService from '../services/UpdateAvatarService'

interface UpdateAvatarProps{
  id: number;
  avatar: string;
}

export default class AvatarController{
  
  async update(request: Request, response: Response){
    
    const { filename: avatar } = request.file
    const { id } = request.headers
          
    const updateAvatarService = new UpdateAvatarService()
    const newAvatar = await updateAvatarService.execute({
      id,
      avatar
    })

    if(newAvatar){      
      return response.status(201).json({ 
        status: 'ok',
        newAvatar
      })
    } else {    
      return response.status(400).json({
        status: 'error',
        Message: 'An error has ocurried with the controller',              
      })
    }  

  }

}