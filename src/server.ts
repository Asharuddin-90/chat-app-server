import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDb } from './db'
import morgan from 'morgan'
import { useBodyParser, useEnhancedExpress } from './helper/server-helper'
import auth from '../src/routes/auth/index'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

//db connection
connectDb()

// Use Morgan middleware for logging HTTP requests
app.use(morgan('tiny'))

//enable cors
app.use(cors())

// Use Enhanced Express Middleware with Express Application
useEnhancedExpress(app)

//body-parser
useBodyParser(app)

app.get('/', (req: Request, res: Response) => {
	res.send('Express + TypeScript Server')
})
//check if server is running
app.get('/api/hello', (req, res) => {
	res.json({ message: 'Hello, World!' })
})

//user auth
app.use('/api/auth', auth)

// return 404 if request URL not found
app.use((req, res) => {
	res.errorRes(404)
})

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`)
})
