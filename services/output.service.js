const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const path = require("path");
const writeResults = async (results) => {

    const csvWriter = createCsvWriter({
        path: path.join(__dirname, "../outputs/results.csv"),

        header: [
            {
                id: "email",
                title: "Email"
            },
            {
                id: "status",
                title: "Status"
            }
        ]
    });

    await csvWriter.writeRecords(results);
    return path.join(__dirname, "../outputs/results.csv");

};
module.exports = { writeResults };