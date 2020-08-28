import { Request, Response } from 'express'

import UpdateAvatarService from '../services/UpdateAvatarService'

export default class AvatarController{
  
  async update(request: Request, response: Response){
    
    const { filename: avatar } = request.file
    const { id } = request.headers
          
    const updateAvatarService = new UpdateAvatarService()
    const user = await updateAvatarService.execute({
      id,
      avatar
    })

    if(user){   
      return response.status(201).json({ user })

    } else {    
      return response.status(400).json({      
        message: 'An error has ocurried with the controller'           
      })

    }  

  }

}