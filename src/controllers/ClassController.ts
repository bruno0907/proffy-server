import { Request, Response } from 'express'

import IndexClassService from '../services/IndexClassService'
import UpdateClassService from '../services/UpdateClassService'
import DeleteClassService from '../services/DeleteClassService'

export default class ClassController {
  async index(request: Request, response: Response){

    const { id } = request.headers

    try {
      const indexClassService = new IndexClassService()

      const userClass = await indexClassService.execute({ id })

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
    const { cost, schedule } = request.body

    try {
      const updateClassService = new UpdateClassService()

      const data = await updateClassService.execute({ 
        id,        
        cost,        
        schedule
      })      

      // console.log(data)
      response.status(200).json(data)

    } catch (error) {
      response.status(400).json({
        message: 'An error has ocurried',
        error: error.message
      })
    }    
  }

  async delete(request: Request, response: Response){
    const { id } = request.headers

    try {
      const deleteClassService = new DeleteClassService()
      const data = await deleteClassService.execute({ id })
      return response.status(200).json({data})

    } catch (error) {
      response.status(400).json({
        message: 'A request error has ocurried',
        error: error.message
        
      })
    }
  }
}