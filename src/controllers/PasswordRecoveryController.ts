import { Request, Response} from 'express'

import PasswordRecoveryService from '../services/PasswordRecoveryService'
import PasswordResetService from '../services/PasswordResetService'

export default class PasswordRecoveryController{
  public async index(request: Request, response: Response): Promise<Response>{    
      
    const { email: userEmail } = request.body         

    try{
      const passwordRecoveryService = new PasswordRecoveryService()
      await passwordRecoveryService.execute(userEmail)             

      return response.status(200).json({
        message: 'Redefinition e-mail sent!',  

      })
    }catch(error){    
      return response.status(400).json({
        message: 'Error sending redefinition e-email',
        error: error.message

      })

    }  
  }

  public async update(request: Request, response: Response): Promise<Response>{    
      
    const { email, password, password_confirm } = request.body             

    if(password !== password_confirm)
      response.status(400).json({
        message: 'Passwords dont Match!'        
      })

    try{     
      const passwordResetService = new PasswordResetService()
      await passwordResetService.execute({ email, password, password_confirm})  

      return response.status(200).json({
        message: 'Password redefinition success!',    

      })
    }catch(error){          
      return response.status(400).json({
        message: 'Error redefining the password',
        error: error.message
      })

    }  
  }
}