import express from 'express'
import { getAllVendors, getVendorById, vendorLogin, vendorRegister } from '../controllers/vendorController.js'

const vendorRouter=express.Router() 

vendorRouter.post('/register',vendorRegister) 
vendorRouter.post('/login',vendorLogin)
vendorRouter.get('/all-vendors', getAllVendors)
vendorRouter.get('/single-vendor/:vendorId', getVendorById)
export default vendorRouter;