import { text } from 'express'
import db from '../database/connection'

import convertHourToMinutes from '../utils/convertHourToMinutes'

interface ScheduleItem {
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
        return console.log('Nenhuma aula cadastrada')
      }      

      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {   
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
  
      classSchedule.map((schedule: ScheduleItem) => {
        if(!Number.isInteger(schedule.id)){          
          classesToAdd.push(schedule)
        } else {          
          classesToUpdate.push(schedule)
        }
      })

      if(classesToAdd.length > 0){
        const classSchedule = classesToAdd.map((scheduleItem: ScheduleItem) => {   
          return {
              class_id,
              week_day: scheduleItem.week_day,
              from: scheduleItem.from,
              to: scheduleItem.to
          }
      })

      await trx('class_schedule').insert(classSchedule)
      }

      classesToUpdate.map(async (scheduleItem: ScheduleItem) => {   
        await trx('class_schedule')
          .where('class_schedule.id', '=', scheduleItem.id)
          .update({
            'class_schedule.week_day': scheduleItem.week_day,
            'class_schedule.from': scheduleItem.from,
            'class_schedule.to': scheduleItem.to
          })
        
      })

      await trx.commit()

      return

    } catch (error) {
      trx.rollback()
      console.log(error.message)
      throw new Error('Error updating user classes')
    }
    
  }
}