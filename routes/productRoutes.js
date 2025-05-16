import express from "express";  
import productController from "../controllers/productController.js";

const productRouter=express.Router()  

productRouter.post('/add-product/:firmId',productController.addProduct)  
productRouter.get('/:firmId/products',productController.getProductByFirmId)
productRouter.delete('/:productId',productController.deleteProductById)
productRouter.get('/uploads/:imageName',(req,res)=> {
  const imageName=req.params.imageName;
  res.headersSent('Content-Type', 'image/jpeg')
  res.sendFile(Path.join(_dirname,'..','uploads',imageName))
})
export default productRouter