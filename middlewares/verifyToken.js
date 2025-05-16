import jwt from "jsonwebtoken";  
import dotEnv from 'dotenv';
import Vendor from "../models/Vendor.js";
dotEnv.config();

const verifyToken=async(req,res,next)=> {
  const token=req.headers.token 
  if(!token) return res.status(401).json({error:'token not there'}) 
    try {
     const decode=jwt.verify(token,process.env.JWT_KEY) 
     const vendor=await Vendor.findById(decode.vendorId)   
     if(!vendor) {
      return res.status(404).json({error:'vendor not found'})
     }
      req.vendorId=vendor._id 
      next()
    } catch (error) {
      console.log(error)
      res.status(500).json({error:'invalid token'})

    }
}

export default verifyToken