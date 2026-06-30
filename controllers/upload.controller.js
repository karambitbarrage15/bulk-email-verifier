
const {verifySyntax}=require('../services/syntax.service');

const uploadFile=(req,res)=>{
 console.log(req.file);
 const result=verifySyntax(email);;
 res.send(`The email ${email} is ${result ? 'valid' : 'invalid'}.`);
};

module.exports={uploadFile};