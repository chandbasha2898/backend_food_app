import express from 'express'
import cors from 'cors'
import dotEnv from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import vendorRouter from './routes/vendorRoutes.js'
import firmRouter from './routes/firmRoutes.js'
import productRouter from './routes/productRoutes.js'
import path from 'path'
dotEnv.config()
const PORT=process.env.PORT || 5000
const app=express()  
app.use(cors())  
app.use(bodyParser.json())   
app.use('/vendor', vendorRouter)
app.use('/firm', firmRouter)
app.use('/product', productRouter)
app.use('/uploads',express.static('uploads'))
mongoose.connect(process.env.MONGO_URL)
.then(()=> {
  console.log('mongodb connect successfully!!!')
})
.catch((err)=> {
  console.log(err)
})
app.listen(PORT , (req,res)=> {
  console.log(`sever runs PORT is ${PORT}`)
})