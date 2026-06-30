const express= require('express');
const app=express();
const uploadsRoutes=require('./routes/uploads.route');
const path=require('path');
const PORT=3000;
app.use(express.static(path.join(__dirname,'public')));

app.use('/uploads',uploadsRoutes);
app.get('/',(req,res)=>{
  res.send("Welcome to the Bulk Email Verifier");
});

app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
});