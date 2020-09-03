import db from '../database/connection'
import convertHourToMinutes from '../utils/convertHourToMinutes'

// interface UpdateUserProps{  
//   id: number,
//   name: string;
//   avatar: string;
//   surname: string;
//   whatsapp: string;
//   bio: string;
//   subject: string;
//   cost: string;  
// }  

// interface ScheduleItemProps{
//   week_day: number;
//   from: string;
//   to: string;
// }

export default class UpdateUserService{

  public async execute({  
    id,      
    avatar,
    name,
    surname, 
    email,
    whatsapp,
    bio,
    // subject,
    // cost,    
  }): Promise<any> {  
  
  const trx = await db.transaction()  

  const updatedUsers = await trx('users')
    .where({ id })
    .update({  
      avatar,           
      name,
      surname,
      email,
      whatsapp,
      bio,        
    }).returning('id')  
  
  // const user_id = updatedUsers[0]

  // const insertedClasses = await trx('classes')
  //   .where({ subject, user_id})
  //   .insert({
  //     subject,
  //     cost,
  //     user_id
  //   }).returning('id')      

  // const class_id = insertedClasses[0]
  // console.log(class_id)

  // const newClassSchedule = scheduleItems.map((scheduleItem: ScheduleItemProps) => {
  //   return {
  //     class_id,
  //     week_day: scheduleItem.week_day,
  //     from: convertHourToMinutes(scheduleItem.from),
  //     to: convertHourToMinutes(scheduleItem.to)
  //   }
  // })

  // await trx('class_schedule').insert(newClassSchedule)
  // console.log(newClassSchedule)

  if(updatedUsers /*|| insertedClasses*/){
    await trx.commit()
    
    } else {
      await trx.rollback()
    }
  }
}
