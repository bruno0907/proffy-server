import db from "../database/connection";

export default class RetrieveClassService{
  public async execute({ id }){

    const response = 
      db('class_schedule')
      .where('class_schedule.class_id', '=', id)  
      .join('classes', 'classes.id', 'class_schedule.class_id')
      .select('classes.*')
      .select(
        db.raw('JSON_AGG(class_schedule.* ORDER BY class_schedule.week_day) as classes')
      )        
      .groupBy('classes.id')        
        

      return response
  }
}