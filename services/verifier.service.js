const {readCSVFile}=require('../utils/csvReader');
const {verifySyntax}=require('./syntax.service');
const {extractDomain,checkDomain}=require('./dns.service');
const verifyEmail=async(filePath)=>{
  const emails=await readCSVFile(filePath);
  const results=[];
  for(const email of emails){
    const syntaxValid=verifySyntax(email);
    if(!syntaxValid){
      results.push({email,status:'Bounce'});
      continue;
    }
    const domain=extractDomain(email);
    const domainValid=await checkDomain(domain);
    if(!domainValid){
      results.push({email,status:'Bounce'});
      continue;
    }
    results.push({email,status:'Valid'});
  }
  return results;
};
module.exports={verifyEmail};