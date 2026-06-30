# Bulk Email Verifier

A Node.js application that verifies email addresses in bulk using multiple validation stages. Users can upload a CSV file containing email addresses, and the application validates each email by checking its syntax, domain, MX records, and SMTP availability. The verification results are displayed in the browser and exported as a downloadable CSV file.

This project was developed as part of a **Bulk Email Verifier Assignment**.

---

# Features

- Upload CSV files containing email addresses
- Email syntax validation using Regular Expressions
- Domain validation using DNS lookup
- MX Record verification
- SMTP mailbox verification
- Asynchronous batch processing using `Promise.all()`
- Download verification results as CSV
- Simple and responsive web interface

---

# Tech Stack

- Node.js
- Express.js
- JavaScript
- Multer
- DNS Promises API
- smtp-client
- csv-parser
- csv-writer
- HTML
- CSS

---

# Project Structure

```
bulk-email-verifier/
│
├── controllers/
│   └── upload.controller.js
│
├── middleware/
│   └── upload.middleware.js
│
├── outputs/
│   └── results.csv
│
├── public/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── routes/
│   └── uploads.route.js
│
├── services/
│   ├── csv.service.js
│   ├── dns.service.js
│   ├── output.service.js
│   ├── smtp.service.js
│   ├── syntax.service.js
│   └── verifier.service.js
│
├── uploads/
│
├── server.js
├── package.json
└── README.md
```

---

# Prerequisites

- Node.js 18+
- npm
- Internet Connection

---

# Installation

Clone the repository

```bash
git clone <repository-url>
```

Move into the project directory

```bash
cd bulk-email-verifier
```

Install dependencies

```bash
npm install
```

---

# Running the Application

Start the server

```bash
node server.js
```

Open the application in your browser

```
http://localhost:3000
```

---

# Input CSV Format

The uploaded CSV file should contain a column named:

```
Person Email
```

Example:

```csv
Person Email
john@gmail.com
alice@yahoo.com
test@example.com
```

---

# Email Verification Flow

Each email is validated using the following stages.

### 1. Syntax Validation

Checks whether the email follows the standard email format using a regular expression.

Example:

```
user@example.com
```

---

### 2. Domain Validation

Checks whether the domain exists using DNS lookup.

Example:

```
gmail.com
```

---

### 3. MX Record Validation

Retrieves the Mail Exchange (MX) records associated with the domain.

If no MX record exists, the email is marked as **Bounce**.

---

### 4. SMTP Verification

The application connects directly to the recipient domain's MX server.

The following SMTP commands are executed:

- EHLO
- MAIL FROM
- RCPT TO
- QUIT

The SMTP session is terminated immediately after the **RCPT TO** command without sending the **DATA** command, ensuring that no email is actually delivered.

---

# Status Values

| Status | Description |
|---------|-------------|
| Valid | Email successfully passed all verification stages |
| Bounce | Invalid syntax, invalid domain, missing MX record, or mailbox rejected by SMTP |
| Unknown | SMTP verification could not be completed due to timeout, server policy, or network restrictions |

---

# Asynchronous Processing

To improve performance, emails are processed asynchronously in configurable batches using JavaScript's `Promise.all()`.

Instead of verifying emails sequentially, multiple emails are processed concurrently while limiting the number of simultaneous SMTP connections.

This significantly improves performance for large CSV files.

---

# API

## Upload CSV

**Endpoint**

```
POST /uploads
```

**Content-Type**

```
multipart/form-data
```

**Request Body**

| Field | Type |
|------|------|
| file | CSV File |

### Response

```json
[
  {
    "email": "john@gmail.com",
    "status": "Valid"
  },
  {
    "email": "fake@test.com",
    "status": "Bounce"
  }
]
```

---

# Output

After verification, a CSV report is automatically generated.

Location

```
outputs/results.csv
```

Example

```csv
Email,Status
john@gmail.com,Valid
fake@test.com,Bounce
admin@example.com,Unknown
```

---

# SMTP Verification Notes

SMTP verification has been implemented according to the assignment specification.

During testing:

- The local ISP blocked outbound SMTP traffic on Port 25.
- ProtonVPN was used to enable outbound SMTP connectivity.
- TCP connectivity to Gmail MX servers was successfully verified.
- Some recipient mail servers immediately reset the SMTP connection (`ECONNRESET`) after connection establishment.

Many modern email providers (such as Gmail, Outlook, Yahoo, and Microsoft 365) intentionally prevent anonymous mailbox verification to reduce abuse and email harvesting.

Therefore, some SMTP servers may:

- Reject the connection
- Reset the connection
- Timeout
- Return generic SMTP responses

In such situations, the application safely returns the email status as **Unknown** instead of terminating unexpectedly.

---

# Limitations

- SMTP verification depends on the recipient mail server.
- Some SMTP servers intentionally disable mailbox verification.
- Some networks and ISPs block outbound Port 25.
- SMTP verification cannot guarantee mailbox existence for every provider.

---

# Future Improvements

- Retry mechanism for temporary SMTP failures
- Configurable batch size
- Background job queue
- Progress bar during verification
- Catch-all email detection
- Disposable email detection
- Export reports in Excel format
- Docker support
- Deployment on Render or Railway

---

# Author

**Aditya Chaturvedi**

B.Tech Mathematics & Computing

Rajiv Gandhi Institute of Petroleum Technology (RGIPT)