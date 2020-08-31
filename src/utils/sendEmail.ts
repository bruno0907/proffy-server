import * as nodemailer from 'nodemailer'

import config from '../config/mailerConfig'

function sendEmail(name: string, email: string, newPassword: string){  

  // Config do client SMTP
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    auth: {
      user: config.auth.user,
      pass: config.auth.pass,
    },
  })

  // Config da mensagem
  const message = {
    from: 'Proffy <proffy@teste.com>',
    to: email,
    subject: `Recuperação da senha de acesso a plataforma Proffy ${Date.now()}`,    
    html: `<h1 style="color: #32264D">Olá ${name}</h1>
    <p>Então você esqueceu a sua de acesso a plataforma proffy?</p> 
    <p>Não se preocupe! Utilize a senha abaixo para acessar a plataforma novamente e faça a alteração para uma nova senha em seu perfil de usuário.</p>
    <p><strong>${newPassword}</strong></p>`
  }

  transporter.verify(function(error){
    if(error){
      console.log('Server is no go!')      
      throw new Error('Cannot connect to the mail server')

    } else {
      console.log('Server is ready to go')      
    }
  })

  //Disparo do email
  transporter.sendMail(message, function(error){    

    if(error){
      console.log('Redefinition email cannot be sent')
      console.log(error.message)      
      return {
        status: 'Error',
        statusCode: '400'
      }
    } else {
      console.log('Success! Redefinition email sent successfully!!')
      return {
        status: 'success',
        statusCode: '200'
      }
    }
    
  })
    
}

export default sendEmail