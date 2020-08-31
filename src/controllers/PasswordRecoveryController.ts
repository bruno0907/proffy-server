import { Request, Response} from 'express'

import PasswordRecoveryService from '../services/PasswordRecoveryService'
import sendEmail from '../utils/sendEmail'
import SendmailTransport from 'nodemailer/lib/sendmail-transport'

export default class PasswordRecoveryController{
  public async index(request: Request, response: Response): Promise<Response>{    
      
    const { email: userEmail } = request.body         

    try{

      const passwordRecoveryService = new PasswordRecoveryService()

      const { name, email, newPassword } = await passwordRecoveryService.execute(userEmail)       

      sendEmail(name, email, newPassword)

      return response.status(200).json({
        message: 'User found!',  
      })

    }catch(error){    

      return response.status(400).json({
        message: 'Error while retrieving e-mail',
        error: error.message
      })

    }  
  }
}