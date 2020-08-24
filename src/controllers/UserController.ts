import { Request, Response } from 'express'

import CreateUserService from '../services/CreateUserService'
import UpdateUserService from '../services/UpdateUserService'

export default class UserController {

    public async create(request: Request, response: Response) : Promise<Response>{
        try {
          const {
            name,
            surname,
            email,
            password,
            password_confirm
          } = request.body

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
            message: 'Something wrong is not right!',
            error: error.message
          })
        }
    }

    public async update(request: Request, response: Response) : Promise<Response>{
      try {
        
        const { id } = request.params

        const {          
          name,
          surname,
          whatsapp,          
          bio,
          subject,
          cost,          
        } = request.body        

        const updateUserService = new UpdateUserService()

        const updatedUser = updateUserService.execute({
          id,
          name,
          surname,
          whatsapp,          
          bio,
          subject,
          cost
        })
        console.log(updatedUser)
        return response.status(200).json(updatedUser)
        
      } catch (error) {

        return response.status(400).json({
          message: 'An error has ocurried!',
          error: error.message

        })
      }
    }
}