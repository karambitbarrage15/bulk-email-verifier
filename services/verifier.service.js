const {readCSVFile}=require('../utils/csvReader');
const {verifySyntax}=require('./syntax.service');
const {extractDomain,checkDomain,checkMx}=require('./dns.service');
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
    const mxValid=await checkMx(domain);
  if(!mxValid){
    results.push({email,status:'Bounce'});
  }
    results.push({email,status:'Valid'});
    continue;
  }
  return results;
};
module.exports={verifyEmail};