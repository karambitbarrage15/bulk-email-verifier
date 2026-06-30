
const {verifySyntax}=require('../services/syntax.service');
const {readCsv}=require('../services/csv.service');
const uploadFile=async(req,res)=>{
 const emails=await readCsv(req.file.path);
console.log(emails);
res.json(emails);};

module.exports={uploadFile};