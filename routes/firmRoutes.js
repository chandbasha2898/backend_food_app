import express from 'express' 
import verifyToken from '../middlewares/verifyToken.js'
import firmController from '../controllers/firmController.js'

const firmRouter=express.Router()

firmRouter.post('/add-firm',verifyToken,firmController.addFirm)  
firmRouter.delete('/:firmId',firmController.deleteFirmById)

firmRouter.get('/uploads/:imageName',(req,res)=> {
  const imageName=req.params.imageName;
  res.headersSent('Content-Type', 'image/jpeg')
  res.sendFile(Path.join(_dirname,'..','uploads',imageName))
})
export default firmRouter