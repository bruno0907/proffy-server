import { Request, Response } from 'express'

import CreateUserService from '../services/CreateUserService'
import UpdateUserService from '../services/UpdateUserService'

export default class UserController {

  public async create(request: Request, response: Response){
    
    const {
      name,
      surname,
      email,
      password,
      password_confirm
    } = request.body

    try {
      const createUserService = new CreateUserService()

      const user = await createUserService.execute({
        name,
        surname,
        email,
        password,
        password_confirm
      })

      return response.status(201).json(user)
    } catch (error) {
      return response.status(400).json({
        message: 'An error has ocurried while creating a new user register',
        error: error.message
      })
    }
  }

  public async update(request: Request, response: Response) {
    
    const {  
      id,        
      avatar,
      name,
      surname,
      email,
      whatsapp,          
      bio,
      // subject,
      // cost,                   
    } = request.body 

    try {

      const updateUserService = new UpdateUserService()

      await updateUserService.execute({
        id,
        avatar,
        name,
        surname,
        email,
        whatsapp,          
        bio,
        // subject,
        // cost,          
      })                
      
      return response.status(200).json({
        id,
        avatar,
        name,
        surname,
        email,
        whatsapp,          
        bio,
        // subject,
        // cost,          
      })
      
    } catch (error) {

      return response.status(400).json({
        message: 'This register cannot be updated.',  
        error: error.message
      })
    }
  }
}