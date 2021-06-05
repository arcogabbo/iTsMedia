import express from 'express'
import home_router from './routes/home_router'

const app = express()
const PORT = 8000

app.use(home_router)

app.listen(PORT, () => {
  console.log(`⚡️: Server is running at https://localhost:${PORT}`)
})