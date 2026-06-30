const express= require('express');
const app= express();
const uploadsRoutes=require('./routes/uploads.route');
const path= require('path');
const PORT=3000;
app.get('/',(req,res)=>{
  res.send("Welcome to the Bulk Email Verifier");
})

app.use('/uploads',uploadsRoutes);
app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
});