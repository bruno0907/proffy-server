import { Request, Response } from 'express'

import AuthUserService from '../services/AuthUserService'

export default class AuthController{  
  public async login(request: Request, response: Response): Promise<Response>{
    try {
      const { email, password } = request.body
      const authUserService = new AuthUserService()
      const { userData, token } = await authUserService.execute({email, password})
      const user = {   
        id: userData.id,     
        name: userData.name,
        surname: userData.surname,
        email: userData.email,        
        password: userData.password,
        avatar: userData.avatar,
        whatsapp: userData.whatsapp,
        bio: userData.bio,    
      }
      response.status(200).json({user, token})
    } catch (error) {
      return response.status(400).json({
        message: 'Something wrong is not right!',
        error: error.message
      })
    }
  }
}