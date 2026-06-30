const {readCSVFile}=require('../utils/csvReader');
const {verifySyntax}=require('./syntax.service');

const verifyEmail=async(filePath)=>{
const emails=await readCSVFile(filePath);
const results=[];
for(const email of emails){
const isValid=verifySyntax(email);
results.push({email,status:isValid?'Valid':'Bounce'});
};
};
module.exports={verifyEmail};