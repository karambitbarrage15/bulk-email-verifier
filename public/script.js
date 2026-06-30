const uploadForm = document.getElementById("uploadForm");
const fileInput = document.getElementById("file");
const message = document.getElementById("message");
const resultsTable = document.querySelector("#resultsTable tbody");
const uploadBtn = document.getElementById("uploadBtn");
const downloadLink = document.getElementById("downloadLink");
const summary = document.getElementById("summary");

uploadForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    if (!fileInput.files.length) {
        alert("Please select a CSV file.");
        return;
    }

    try {

        uploadBtn.disabled = true;
        uploadBtn.textContent = "Processing...";

        message.textContent = "Processing...";

        summary.innerHTML = "";

        resultsTable.innerHTML = "";

        downloadLink.style.display = "none";

        const formData = new FormData();

        formData.append("file", fileInput.files[0]);

        const response = await fetch("/uploads", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Failed to upload file.");
        }

        const results = await response.json();

        message.textContent =
            `Verification Completed! ${results.length} emails processed.`;

        fileInput.value = "";

        let validCount = 0;
        let bounceCount = 0;
        let unknownCount = 0;

        results.forEach((result, index) => {

            if (result.status === "Valid") {
                validCount++;
            }
            else if (result.status === "Bounce") {
                bounceCount++;
            }
            else {
                unknownCount++;
            }

            const row = document.createElement("tr");

            const color =
                result.status === "Valid"
                    ? "green"
                    : result.status === "Bounce"
                        ? "red"
                        : "orange";

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${result.email}</td>
                <td style="color:${color};font-weight:bold;">
                    ${result.status}
                </td>
            `;

            resultsTable.appendChild(row);

        });

        summary.innerHTML = `
            <h3>Summary</h3>

            <p><strong>Total Emails:</strong> ${results.length}</p>

            <p style="color:green;">
                <strong>Valid:</strong> ${validCount}
            </p>

            <p style="color:red;">
                <strong>Bounce:</strong> ${bounceCount}
            </p>

            <p style="color:orange;">
                <strong>Unknown:</strong> ${unknownCount}
            </p>
        `;

        downloadLink.style.display = "inline";

    }

    catch (error) {

        console.error(error);

        message.textContent = `Error: ${error.message}`;

    }

    finally {

        uploadBtn.disabled = false;

        uploadBtn.textContent = "Upload CSV";

    }

});