require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const dbConfig = {
    user: 'sqladmin',
    password: 'Password1234!',
    server: 'devops-mssql-server-dev.database.windows.net',
    database: 'devops-db',
    options: {
        encrypt: true,
        enableArithAbort: true
    }
};

app.post('/submit-data', async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
            .input('FirstName', sql.NVarChar(50), req.body.firstName)
            .input('LastName', sql.NVarChar(50), req.body.lastName)
            .input('Email', sql.NVarChar(100), req.body.email)
            .query('INSERT INTO UserData.UserInfo (FirstName, LastName, Email) VALUES (@FirstName, @LastName, @Email)');
        
        res.status(200).json({ message: 'Data submitted successfully', result: result });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
