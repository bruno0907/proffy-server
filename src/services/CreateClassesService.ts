import db from '../database/connection'
import convertHourToMinutes from '../utils/convertHourToMinutes'

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class CreateClassesService{
  public async execute({
    id,    
    subject,
    cost,
    schedule
  }): Promise<any>{  

    const trx = await db.transaction()

    try {  
      
       const insertedClassesId = await trx('classes').insert({
         subject,
         cost,
         user_id: id
       }).returning('id')

       const class_id = insertedClassesId[0]

       const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {   
         return {
           class_id,
           week_day: scheduleItem.week_day,
           from: convertHourToMinutes(scheduleItem.from),
           to: convertHourToMinutes(scheduleItem.to)
         }
       })

       await trx('class_schedule').insert(classSchedule)

       await trx.commit()

       return 
      
    } catch (error) {

      trx.rollback()
      throw new Error('Error adding new classes')
    }
    
  }
}