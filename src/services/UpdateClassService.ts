import { response } from 'express'
import db from '../database/connection'

export default class UpdateClassService{
  public async execute({ id, subject, cost, schedule }){
    return {
      id,
      subject,
      cost,
      schedule    
    }
  }
}