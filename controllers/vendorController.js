import Vendor from "../models/Vendor.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotEnv from "dotenv";
dotEnv.config();
export const vendorRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const vendorEmail = await Vendor.findOne({ email });
    if (vendorEmail)
      return res.status(400).json({ message: "Email already existed" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newVendor = new Vendor({ username, email, password: hashedPassword });
    await newVendor.save();
    res.status(201).json({ message: "Registration successfully!!!!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
};

export const vendorLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const vendor = await Vendor.findOne({ email });
    if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ vendorId: vendor._id }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ success: "Login Sucussfully!", token });
    console.log(email, token);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
};
export const getAllVendors=async(req,res)=> {
  try {
    const vendors=await Vendor.find().populate('firm')
    res.json({vendors})
  } catch (error) {
   console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
}
export const getVendorById=async(req,res)=> {
  const vendorId=req.params.vendorId
  try {
    const vendor= await Vendor.findById(vendorId).populate('firm') 
    console.log(vendor) 
    if(!vendor) return res.status(404).json({error:'vender not found'})
    res.status(200).json({vendor})
  } catch (error) {
   console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
}
