import { Request, Response } from 'express'

import RetrieveClassService from '../services/IndexClassService'
import UpdateClassService from '../services/UpdateClassService'

export default class ClassController {
  async index(request: Request, response: Response){

    const { id } = request.headers

    try {
      const retrieveClassService = new RetrieveClassService()

      const userClass = await retrieveClassService.execute({ id })

      response.status(200).json(userClass)

    } catch (error) {
      response.status(400).json({
        message: 'An error has ocurried',
        error: error.message
      })
    }    
  }

  async update(request: Request, response: Response){

    const { id } = request.headers
    const { 
      subject,
      cost,
      schedule
    } = request.body

    try {
      const updateClassService = new UpdateClassService()

      const userClass = await updateClassService.execute({ 
        id,
        subject,
        cost,
        schedule
      })      
      response.status(200).json(userClass)

    } catch (error) {
      response.status(400).json({
        message: 'An error has ocurried',
        error: error.message
      })
    }    
  }
}