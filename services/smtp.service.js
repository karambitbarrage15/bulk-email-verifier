// smtp.service.js

const { SMTPClient } = require("smtp-client");

const verifySMTP = async (email, mxServer) => {
    const client = new SMTPClient({
        host: mxServer,
        port: 25,
        timeout: 10000
    });client.on("error", (err) => {
    console.log("SMTP Event Error:", err.code || err.message);
});

    try {
        await client.connect();

        try {
            await client.greet({ hostname: "localhost" });
        } catch (err) {
            console.log("EHLO failed, trying HELO...");
            await client.helo({ hostname: "localhost" });
        }

        await client.mail({
            from: "verifier@example.com"
        });

        await client.rcpt({
            to: email
        });

        await client.quit();

        console.log(`${email} -> VALID`);

        return "Valid";
    }
    catch (error) {

        console.log("\n================ SMTP ERROR ================");
        console.log("Email:", email);
        console.log("MX Server:", mxServer);

        if (error.code) {
            console.log("Node Error Code:", error.code);
        }

        if (error.responseCode) {
            console.log("SMTP Response Code:", error.responseCode);
        }

        if (error.response) {
            console.log("SMTP Response:", error.response);
        }

        console.dir(error, { depth: null });

        try {
            await client.quit();
        } catch (_) {}

        if (error.responseCode === 550) {
            return "Bounce";
        }

        if (error.responseCode === 551) {
            return "Bounce";
        }

        if (error.responseCode === 553) {
            return "Bounce";
        }

        if (error.responseCode === 450) {
            return "Unknown";
        }

        if (error.responseCode === 451) {
            return "Unknown";
        }

        if (error.responseCode === 421) {
            return "Unknown";
        }

        if (error.code === "ETIMEDOUT") {
            return "Unknown";
        }

        if (error.code === "ECONNREFUSED") {
            return "Unknown";
        }

        if (error.code === "ECONNRESET") {
            return "Unknown";
        }

        if (error.code === "EHOSTUNREACH") {
            return "Unknown";
        }

        return "Unknown";
    }
};

module.exports = {
    verifySMTP
};