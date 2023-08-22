const express = require("express");
const multer = require("multer");
const fs = require("fs");
const file = require("./models/db");
const cloudinary = require("cloudinary").v2;
const cors = require('cors');
const app = express();

app.use(cors());
const PORT = 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const unique =
      Date.now() + Math.round(Math.random() * 10000) + `${file.originalname}`;
    cb(null, unique);
  },
});
// console.log(file);

const upload = multer({ storage: storage });

cloudinary.config({ 
  cloud_name: 'dewszfsoq', 
  api_key: '285984847612323', 
  api_secret: 'BJutkFLxDjiDM4gnqFhqLFBG0MU'
});

app.post("/upload", upload.single("uploadedfile"), async (req, res) => {
  try {
    const filePath = `./public/images/${req.file.filename}`;
    
    const result = await cloudinary.uploader.upload(filePath);
    const data = await file.create({
      image: {
        public_id: result.public_id,
        url: result.secure_url,
        name:result.original_filename,
        format:result.format
      },
    });
    res.json({ data: data, result: result });
  } catch (error) {
    res.json({error})
  }
});

app.get("/all" , async (req,res) =>{
  const allFiles = await file.find()
  res.json({allFiles})
})

app.get("/delete/:id" , async (req,res) =>{
  const id = req.params.id
  const allFiles = await file.findByIdAndDelete(id)
  res.json("File Deleted Successfully")
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
