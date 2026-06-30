

const verifyEmail = require('../services/verifier.service');
const uploadFile = async (req, res) => {
try{ const results = await verifyEmail.verifyEmail(req.file.path);
 res.json(results);}catch(error){
  console.error( error);
  res.status(500).json({ error:error.message });
}};

module.exports = { uploadFile };