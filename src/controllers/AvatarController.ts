import { Request, Response } from 'express'

import UpdateAvatarService from '../services/UpdateAvatarService'

export default class AvatarController{  
  async update(request: Request, response: Response){    
    const { filename: avatar } = request.file
    const { id } = request.params          
    try {      
      const updateAvatarService = new UpdateAvatarService()
      const [user] = await updateAvatarService.execute({
        id,
        avatar
      })    
      return response.status(201).json({ user })
    } catch (error) {
      return response.status(400).json({      
          message: 'An error has ocurried updating avatar',
          error: error.message           
      })
    }
  }
}