import db from '../database/connection'

interface ClassProps{
  id: number;
}

export default class DeleteClassService{
  public async execute({ id }: ClassProps){

    try {
      await db('class_schedule')
        .where({ id })
        .delete() 
    } catch (error) {
      throw new Error('Cannot delete class')
    }

  }
}