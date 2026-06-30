const express=require('express');
const router=express.Router();
const {uploadFile}=require('../controllers/upload.controller');
const upload=require('../middleware/upload.middleware');
router.post('/',upload.single('file'),uploadFile);
module.exports=router;
