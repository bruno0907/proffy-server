import db from "../database/connection";

export default class ListClassesService{
  public async execute({ id }):Promise<any>{
    const classes = db('classes')
      .where('user_id', '=', id)
      .join(
        'class_schedule', 
        'classes.id', 
        'class_schedule.class_id'
      )
      .select('classes.*')
      .select(
        db.raw(
          'JSON_AGG(class_schedule.*) as classes'
        )
      )
      .groupBy(
        'classes.id', 
        'class_schedule.class_id'
      )  
    return classes
  }
}