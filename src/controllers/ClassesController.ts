import { Request, Response } from "express";

// import db from "../database/connection";
// import convertHourToMinutes from "../utils/convertHourToMinutes";

import ListClassesService from '../services/ListClassesService'
import CreateClassesService from "../services/CreateClassesService";

export default class ClassesController {
  async index(request: Request, response: Response) {
    // const filters = request.query;

    // const subject = filters.subject as string;
    // const week_day = filters.week_day as string;
    // const time = filters.time as string;

    // if (!filters.week_day || !filters.subject || !filters.time) {
    //   return response.status(400).json({
    //     error: "Missing filters to search classes",
    //   });
    // }

    try {
    //   const timeInMinutes = convertHourToMinutes(time);

    //   const classes = await db("classes")
    //     .whereExists(function () {
    //       this.select("class_schedule.*")
    //         .from("class_schedule")
    //         .whereRaw("class_schedule . class_id = classes . id")
    //         .whereRaw("class_schedule . week_day = ??", [Number(week_day)])
    //         .whereRaw("class_schedule . from <= ??", [timeInMinutes])
    //         .whereRaw("class_schedule . to > ??", [timeInMinutes]);
    //     })
    //     .where("classes.subject", "=", subject)
    //     .join("users", "classes.user_id", "=", "users.id")
    //     .select(["classes.*", "users.*"]);

    //   return response.json(classes);

       const listClasses = new ListClassesService()
       
       const teachers = await listClasses.execute()

    //    console.log(classes)
       
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
