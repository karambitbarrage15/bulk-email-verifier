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

    let smtpResult = "Unknown";

    try {
        smtpResult = await verifySMTP(email, mxServer);
    } catch (error) {
        console.log("SMTP Verification Failed:", error.code || error.message);
    }

    return {
        email,
        status: smtpResult
    };
}

const verifyEmail = async (filePath) => {

    const emails = await readCsv(filePath);

    const batchSize = 1;

    const results = [];

    for (let i = 0; i < emails.length; i += batchSize) {

        const batch = emails.slice(i, i + batchSize);

        console.log(
            `Processing batch ${Math.floor(i / batchSize) + 1} (${batch.length} emails)`
        );

        const batchResults = await Promise.all(
            batch.map(email => processEmail(email))
        );

        results.push(...batchResults);

        await new Promise(resolve => setTimeout(resolve, 1500));
    }

    await writeResults(results);

    return results;
};

module.exports = {
    verifyEmail
};