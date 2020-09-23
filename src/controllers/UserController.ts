import { Request, Response } from 'express'

import IndexUserService from '../services/IndexUserService'
import CreateUserService from '../services/CreateUserService'
import UpdateUserService from '../services/UpdateUserService'

export default class UserController {

  public async index(request: Request, response: Response){
    try {      
      const indexUserService = new IndexUserService()
      const totalUsers = await indexUserService.execute()
      const { total } = totalUsers[0]

      return response.status(200).json(total)

    } catch (error) {
      return response.status(400).json({
        error: error.message

      })
    }
  }

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
      avatar,
      name,
      surname,
      email,
      whatsapp,          
      bio,                  
    } = request.body 
    const { id } = request.params

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
      })                
      
      return response.status(200).json({
        id,
        avatar,
        name,
        surname,
        email,
        whatsapp,          
        bio,         
      })
      
    } catch (error) {

      return response.status(400).json({
        message: 'Error updating user.',  
        error: error.message
      })
    }
  }
}