import db from '../database/connection'

export default class DeleteClassService{
  public async execute({ id }){

    const data = await db('class_schedule')
      .where({ id })
      .delete()      

    if(data){      
      return {
        status: 'OK',
        code: '200'
      }
    } else {
      throw new Error('Id not found')
    }

  }
}