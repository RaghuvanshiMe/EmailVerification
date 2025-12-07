import express from 'express'
import dotenv from 'dotenv'
import DbCon from './libs/db.js'
import AuthRoutes from './routes/Auth.routes.js'
import cors from "cors"

dotenv.config()

DbCon()
const PORT = process.env.PORT || 8000
const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(express.json())

app.use('/auth', AuthRoutes)


app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})
