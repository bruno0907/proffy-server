import express from 'express'
import path from 'path'
import cors from 'cors'
import routes from './routes'

const app = express()

const PORT = process.env.PORT || 3333

app.use(cors())
app.use(express.json())

app.use('/img', express.static(path.resolve(__dirname, '..', 'uploads')))

app.use(routes)


app.listen(PORT, () => {
    console.log(`Server listening ${PORT} port`)
})