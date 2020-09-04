import { Request, Response } from "express";

// import db from "../database/connection";
// import convertHourToMinutes from "../utils/convertHourToMinutes";

import ListClassesService from '../services/ListClassesService'
import CreateClassesService from "../services/CreateClassesService";

export default class ClassesController {
  async index(request: Request, response: Response) {

    try {
    
       const listClasses = new ListClassesService()
       
       const teachers = await listClasses.execute()    
       
       return response.status(200).json(teachers)
    } catch (error) {
      console.log("Error", error);
      return response.status(400).json({
        error: "No classes where found",
      });
    }
  }

  async create(request: Request, response: Response) {
    const { subject, cost, schedule } = request.body;

    const { id } = request.params;

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

      console.log(newClass);

      return response.status(201).json(newClass);
    } catch (error) {
      return response.status(400).json({
        error: error.message,
      });
    }
  }
}
