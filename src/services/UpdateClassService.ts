import db from '../database/connection'

interface ScheduleItemProps {
  id: number;
  week_day: number;
  from: string;
  to: string;
  class_id: number;
}

export default class UpdateClassService{
  public async execute({ id, cost, schedule }){
    const trx = await db.transaction()
    try {
      const updatedClassCost = await trx('classes')
      .where({ id })
      .update({ cost })
      .returning('id')

      const class_id = updatedClassCost[0]
      const scheduledClasses = await trx('class_schedule')
        .where({ class_id })

      if(!scheduledClasses){
        throw new Error('No classes were found.')
      }      
      const classSchedule = schedule.map((scheduleItem: ScheduleItemProps) => {   
        return {
          id: scheduleItem.id,
          week_day: Number(scheduleItem.week_day),
          from: scheduleItem.from,
          to: scheduleItem.to,
          class_id,
        }
      })
      
      let classesToAdd = []
      let classesToUpdate = []
  
      classSchedule.map((schedule: ScheduleItemProps) => {
        if(!Number.isInteger(schedule.id)){          
          classesToAdd.push(schedule)
        } else {          
          classesToUpdate.push(schedule)
        }
      })
      
      if(classesToAdd.length > 0){
        const classSchedule = classesToAdd.map((scheduleItem: ScheduleItemProps) => {   
          return {
            class_id,
            week_day: scheduleItem.week_day,
            from: scheduleItem.from,
            to: scheduleItem.to
          }
      })
      
      await trx('class_schedule').insert(classSchedule)
      }

      for(let i = 0; i < classesToUpdate.length; i++){
        let { id, week_day, from, to } = classesToUpdate[i]

        await trx('class_schedule')
          .where({ id })
          .update({
            week_day,
            from,
            to
          })
      }

      await trx.commit()
      return

    } catch (error) {
      trx.rollback()
      console.log(error.message)
      throw new Error('Error updating user classes')
    }
    
  }
}