import db from '../database/connection'

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

export default class UpdateUserService{

  public async execute({  
    id,      
    name,
    surname, 
    whatsapp,
    bio,
    subject,
    cost
  }): Promise<any> {

  if(!name){
    throw new Error('You must inform at least your name')
  }

  
  const trx = await db.transaction()  

  const updatedUsers = await trx('users').where({ id: id }).update({             
      name,
      surname,
      whatsapp,
      bio,
  }).returning('id')  
  
  const user_id = updatedUsers[0]

  const insertedClasses = await trx('classes')
    .where({ subject: subject, user_id: id})
    .first()
    .returning('id')

  
    if(!insertedClasses){
      await trx('classes').insert({
        subject,
        cost,
        user_id
      })        
    }

    if(updatedUsers || insertedClasses){
      await trx.commit()
      
    } else {
      await trx.rollback()
    }
  }
}
