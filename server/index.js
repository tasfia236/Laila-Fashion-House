import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import productRoutes from './routes/product.route.js'
const port = process.env.PORT || 4000

const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()

//Connect MongoDB
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('MongoDB is Connected')
  })
  .catch(err => {
    console.error(err)
  })

// MiddleWare
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internet Server Error.'
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
})

app.use('/user', userRoutes)
app.use('/auth', authRoutes)
app.use('/manage', authRoutes)
app.use('/products', productRoutes)
app.use('/product', productRoutes)
app.use('/total-Products', productRoutes)
app.use('/add', productRoutes)
app.use('/update', productRoutes)
app.use('/delete', productRoutes)

app.listen(port, () => {
  console.log(`Server is running port ${port}`)
})
