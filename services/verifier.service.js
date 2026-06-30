const { readCsv } = require("./csv.service");
const { verifySyntax } = require("./syntax.service");
const { extractDomain, checkDomain, checkMx } = require("./dns.service");
const { verifySMTP } = require("./smtp.service");
const { writeResults } = require("./output.service");

async function processEmail(email) {

    const syntaxValid = verifySyntax(email);

    if (!syntaxValid) {
        console.log(email, "Invalid Syntax");
        return {
            email,
            status: "Bounce"
        };
    }

    console.log(email, "Valid Syntax");

    const domain = extractDomain(email);

    const domainValid = await checkDomain(domain);

    if (!domainValid) {
        console.log(domain, "Invalid Domain");
        return {
            email,
            status: "Bounce"
        };
    }

    console.log(domain, "Valid Domain");

    const mxRecords = await checkMx(domain);

    if (!mxRecords || mxRecords.length === 0) {
        console.log(domain, "No MX Records Found");
        return {
            email,
            status: "Bounce"
        };
    }

    console.log(domain, "MX Records Found");

    mxRecords.sort((a, b) => a.priority - b.priority);

    const mxServer = mxRecords[0].exchange;

    // Uncomment when SMTP is implemented
    // const smtpResult = await verifySMTP(email, mxServer);
    // return {
    //     email,
    //     status: smtpResult
    // };

    return {
        email,
        status: "Valid"
    };
}

const verifyEmail = async (filePath) => {

    const emails = await readCsv(filePath);

    const batchSize = 10;

    const results = [];

    for (let i = 0; i < emails.length; i += batchSize) {

        const batch = emails.slice(i, i + batchSize);

        const batchResults = await Promise.all(
            batch.map(email => processEmail(email))
        );

        results.push(...batchResults);
    }

    await writeResults(results);

    return results;
};

module.exports = {
    verifyEmail
};