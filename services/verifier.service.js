const { readCsv } = require("./csv.service");
const { verifySyntax } = require("./syntax.service");
const { extractDomain, checkDomain, checkMx } = require("./dns.service");
const { verifySMTP } = require("./smtp.service");

const verifyEmail = async (filePath) => {
    const emails = await readCsv(filePath);

    const results = [];

    for (const email of emails) {
        const syntaxValid = verifySyntax(email);

        if (!syntaxValid) {
          console.log(email, "Invalid Syntax");
            results.push({
                email,
                status: "Bounce",
            });
            continue;
        }
console.log(email, "Valid Syntax");
        const domain = extractDomain(email);

        const domainValid = await checkDomain(domain);

        if (!domainValid) {
          console.log(domain, "Invalid Domain");
            results.push({
                email,
                status: "Bounce",
            });
            continue;
        }
        console.log(domain, "Valid Domain");

        const mxRecords = await checkMx(domain);

        if (!mxRecords || mxRecords.length === 0) {
          console.log(domain, "No MX Records Found");
            results.push({
                email,
                status: "Bounce",
            });
            continue;
        }console.log(domain, "MX Records Found");

        mxRecords.sort((a, b) => a.priority - b.priority);

        const mxServer = mxRecords[0].exchange;

       // const smtpResult = await verifySMTP(email, mxServer);

        results.push({
            email,
            status:"Valid",
        });
    }

    return results;
};

module.exports = {
    verifyEmail,
};