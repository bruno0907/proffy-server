import { Request, Response } from "express";

import IndexClassesService from '../services/IndexClassesService'
import IndexUserClassesService from '../services/IndexUserClassesService'
import CreateClassesService from "../services/CreateClassesService";

export default class ClassesController {
  async indexAll(request: Request, response: Response) {

    try {    
       const indexClassesService = new IndexClassesService()       
       const teachers = await indexClassesService.execute()    
       
       return response.status(200).json(teachers)

    } catch (error) {      
      return response.status(400).json({
        error: "No classes where found",

      });
    }
  }

  async index(request: Request, response: Response) {
    const { id } = request.headers

    try {    
       const indexUserClassesService = new IndexUserClassesService()       
       const classes = await indexUserClassesService.execute({ id })    
       
       return response.status(200).json(classes)
    } catch (error) {      
      return response.status(400).json({
        error: "No classes where found",

      });
    }
  }

  async create(request: Request, response: Response) {
    const { subject, cost, schedule } = request.body;
    const { id } = request.headers;

    try {
      if (!id || !subject || !cost || !schedule) {
        return;
      }

      const createdClassService = new CreateClassesService();

      const newClass = await createdClassService.execute({
        id,        
        subject,
        cost,
        schedule,
      });

      return response.status(201).json(newClass);
    } catch (error) {
      return response.status(400).json({
        error: error.message,
      });
    }
  }
}
