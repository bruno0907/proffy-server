import * as nodemailer from 'nodemailer'


require('dotenv').config()

function sendEmail(name: string, email: string, newPassword: string){  

  // Config do client SMTP
  const transport = nodemailer.createTransport({
    host: process.env.NM_HOST,
    port: process.env.NM_PORT,
    auth: {
      user: process.env.NM_USER,
      pass: process.env.NM_PASS,
    },
  })

  transport.verify(function(error){
    if(error){
      console.log('Server is no go!')      
      throw new Error('Cannot connect to the mail server')

    } else {
      console.log('Server is ready to go')      
    }
  })

  //Disparo do email
  transport.sendMail({
    from: 'Proffy <proffy@teste.com>',
    to: email,
    subject: `Recuperação da senha de acesso a plataforma Proffy ${Date.now()}`,    
    html: `    
          <html lang="pt-BR">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Proffy - Recuperação de senha</title>
            <style>
              body {
                background: #8257E5 url('https://');
                color: #FFFFFF;
                font-family: Sans-serif;  
                padding: 22px;
              }
              h1 {
                font-size: 36px;
              }
              p {
                font-size: 16px;
                line-height: 22px;
              }
              div {
                margin: 44px 0;
              }
              span {              
                padding: 12px 24px;
                background: #FFFF;
                color: #32264D;
                font-size: 24px;
                font-weight: bold;                
              }          
            </style>
          </head>
          <body>                  
            <h1>Olá  ${name}!</h1>
            <p>Então você esqueceu sua senha? Não tem problema! Utilize a nova senha abaixo para acessar novamente a plataforma e volte aos estudos.</p>
            <div>
              <span>${newPassword}</span>
            </div>          
            <p>Saiba! Você pode a qualquer momento redefinir uma nova senha de sua preferência no seu perfil. Para isso, basta acessá-lo na tela inicial da plataforma clickando no seu nome para acessar o painel e então em redefinir senha.</p>
            <h3>Bons estudos!!!</h3> 
            <p>Equipe Proffy!</p>
          </body>
      </html>  
    `    
  }, error => {    

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