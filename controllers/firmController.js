import multer from 'multer'
import Vendor from '../models/Vendor.js';
import Firm from '../models/Firm.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // folder to save files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now()+ Path2D.extname(file.originalname)); // unique name
  }
});
const upload = multer({ storage });
const addFirm=async(req,res)=> {
  try {
    const {firmName,area,category,region,offer}=req.body;
    const image=req.file? req.file.filename:undefined  
    const vendor=await Vendor.findById(req.vendorId) 
    if(!vendor) {
      return res.status(404).json({message:'vendor not found'})
    }
    const firm=new Firm({firmName,area,category,region,offer,image,vendor:vendor._id})
    const savedFirm=await firm.save()  
    vendor.firm.push(savedFirm)  
    await vendor.save()   
    return res.status(200).json({message:'firm added successfully!'})

  } catch (error) {
    console.log(error)
    return res.status(500).json({error:'internal server'})
  }
}

const deleteFirmById=async(req,res)=> {
  try {
    const firmId=req.params.firmId;
    const deleteFirm=await Firm.findByIdAndDelete(firmId)
    if(!deleteFirm) return res.status(404).json({error:'firm not found'})
  } catch (error) {
   console.log(error);
    return res.status(500).json({ error: "internal server" });
  }
}

export default {addFirm:[upload.single('image'),addFirm],deleteFirmById}