import express from 'express'
import dbConnection from './config/dbConnection.js'
import dotenv from 'dotenv'
import morgan from 'morgan'
import userRoutes from './routes/user.routes.js'
import cookieParser from 'cookie-parser'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5005

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res)=>{
    return res.status(200).json({
        success: true,
        message: "Home page of server"
    })
})

app.use('/api/blog/user', userRoutes)

app.all('*', (req, res)=>{
    return res.status(404).json({
        success: false,
        message: "Error, this page does not exists!"
    })
})

app.listen(PORT, async()=>{
    await dbConnection()
    console.log(`Server is up and running on http://localhost:${PORT}`)
})