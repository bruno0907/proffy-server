import db from "../database/connection";

export default class ListClassesService{
  public async execute():Promise<any>{

    const teachers = db('classes')
      .join(
        'users', 
        'classes.user_id', 
        'users.id'
      )
      .join(
        'class_schedule', 
        'classes.id', 
        'class_schedule.class_id'
      )  
      .select(
        'classes.id', 
        'classes.subject', 
        'classes.cost', 
        'classes.user_id'
      )  
      .select(
        'users.id as user_id', 
        'users.name', 
        'users.surname', 
        'users.bio', 
        'users.avatar', 
        'users.whatsapp'
      )  
      .select(
        db.raw('JSON_AGG(class_schedule.* ORDER BY class_schedule.week_day) as classes')
      )
      .groupBy(
        'classes.id', 
        'users.id'
      )      
      return teachers
  }
}