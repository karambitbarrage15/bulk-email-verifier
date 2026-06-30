# Bulk Email Verifier

A Node.js application that verifies email addresses in bulk by performing multiple validation steps. Users can upload a CSV file containing email addresses, and the application checks each email for syntax validity, domain existence, and MX records. The verification results are displayed in the browser and exported as a CSV file.

---

## Features

- Upload CSV file containing email addresses
- Email syntax validation
- Domain existence verification using DNS
- MX record verification
- Asynchronous batch processing using Promise.all()
- Results displayed in a web interface
- Export verification results as CSV
- Simple and responsive frontend

---

## Tech Stack

- Node.js
- Express.js
- Multer
- DNS Promises API
- csv-parser
- csv-writer
- HTML
- CSS
- JavaScript

---

## Project Structure

```
bulk-email-verifier/
│
├── controllers/
│   └── upload.controller.js
│
├── middleware/
│   └── upload.middleware.js
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
├── outputs/
├── package.json
├── server.js
└── README.md
```

---

## Verification Process

Each email goes through the following validation steps:

1. Syntax Validation
2. Domain Validation
3. MX Record Validation
4. SMTP Verification (planned)

The application classifies emails as:

- Valid
- Bounce
- Unknown (SMTP timeout or connection failure)

---

## Installation

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

Start the server

```bash
node server.js
```

Open the application

```
http://localhost:3000
```

---

## CSV Format

Input CSV should contain a column named:

| Person Email |
|---------------|
| abc@gmail.com |
| xyz@yahoo.com |

Example:

```csv
Person Email
abc@gmail.com
john@example.com
alice@test.com
```

---

## Output

The application generates a CSV file in

```
outputs/results.csv
```

Example output

| Email | Status |
|--------|--------|
| abc@gmail.com | Valid |
| test@test | Bounce |
| xyz@yahoo.com | Valid |

---

## Performance

To improve performance, emails are processed asynchronously in batches using **Promise.all()**.

Instead of verifying emails sequentially, the application processes multiple emails concurrently while limiting the batch size to avoid overwhelming DNS or SMTP servers.

---

## Future Improvements

- SMTP mailbox verification
- Catch-all email detection
- Disposable email detection
- Role-based email detection
- Retry mechanism for temporary SMTP failures
- Progress bar during verification
- Deployment on Render/Railway

---

## API

### Upload CSV

```
POST /uploads
```

Request

```
multipart/form-data
```

Field Name

```
file
```

Response

```json
[
  {
    "email": "john@example.com",
    "status": "Valid"
  },
  {
    "email": "test@test",
    "status": "Bounce"
  }
]
```

---

## Dependencies

- express
- multer
- csv-parser
- csv-writer
- smtp-client
- dns

---

## Author

Aditya Chaturvedi

B.Tech Mathematics and Computing

Rajiv Gandhi Institute of Petroleum Technology (RGIPT)