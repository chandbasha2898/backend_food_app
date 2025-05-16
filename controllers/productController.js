import multer from "multer";
import Firm from "../models/Firm.js";
import Product from "../models/Product.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder to save files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique name
  },
});
const upload = multer({ storage });

const addProduct = async (req, res) => {
  try {
    const { productName, category, bestSeller, price, description } = req.body;
    const image = req.file ? req.file.filename : undefined;
    const firmId = req.params.firmId;
    const firm = await Firm.findById(firmId);
    if (!firm) return res.status(404).json({ error: "firm not found" });
    const product = new Product({
      productName,
      category,
      bestSeller,
      price,
      description,
      image,
      firm: firm._id,
    });
    const savedProduct = await product.save();
    firm.products.push(savedProduct);
    await firm.save();
    return res.status(200).json({ message: "product added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server" });
  }
};

const getProductByFirmId=async(req,res)=> {
  try {
    const firmId=req.params.firmId;
    const firm=await Firm.findById(firmId)
    if(!firm) return res.status(404).json({error:"firm not found"})
    const products=await Product.find({firm:firmId})
  const restaurentName=firm.firmName
  res.status(200).json({restaurentName,products})
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server" });
  }
}

const deleteProductById=async(req,res)=> {
  try {
    const productId=req.params.productId;
    const deleteProduct=await Product.findByIdAndDelete(productId)
    if(!deleteProduct) return res.status(404).json({error:'product not found'})
  } catch (error) {
   console.log(error);
    return res.status(500).json({ error: "internal server" });
  }
}
export default { addProduct: [upload.single("image"), addProduct],getProductByFirmId,deleteProductById };
