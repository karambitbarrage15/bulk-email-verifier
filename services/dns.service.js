//extractDomain
// checkDomain
//checkMx

const dns=require('dns').promises;
const extractDomain=(email)=>{
return email.split('@')[1];


};
const checkDomain=async(domain)=>{try{await dns.resolveMx(domain);
  return true;
} catch (error) {
  return false;
}};
const checkMx=async(domain)=>{
  try{
const records=await dns.resolveMx(domain);
return records.length>0;

  }catch(error){
    return false;
  }
};
module.exports={extractDomain,checkDomain,checkMx };
