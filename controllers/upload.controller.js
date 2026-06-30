
const { verifySyntax } = require('../services/syntax.service');
const { readCsv } = require('../services/csv.service');
const verifyEmail = require('../services/verifier.service');
const uploadFile = async (req, res) => {
 const results = await verifyEmail.verifyEmail(req.file.path);
 res.json(results);
};

module.exports = { uploadFile };