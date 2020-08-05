import express from 'express'
import cors from 'cors'
import routes from './routes'

const app = express()

const PORT: string|number = process.env.PORT || 3333

app.use(cors())
app.use(express.json())

app.use(routes)

app.listen(PORT, function(){
    console.log(`Server listening ${PORT} port`)
})