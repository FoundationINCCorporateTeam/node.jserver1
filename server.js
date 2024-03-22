// Import required packages
const express = require('express');
const mysql = require('mysql');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'sql300.infinityfree.com',
    user: 'if0_36213692',
    password: 'MN4444',
    database: 'if0_36213692_mngames1'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Parse JSON bodies
app.use(express.json());

// Define a route to handle POST requests
app.post('/insert-data', (req, res) => {
    const data = req.body;

    // Example query to insert data into a table
    const insertQuery = 'INSERT INTO your_table_name SET ?';

    // Execute the query with the data from the request body
    connection.query(insertQuery, data, (err, result) => {
        if (err) {
            console.error('Error inserting data into MySQL:', err);
            res.status(500).send('Error inserting data into MySQL');
            return;
        }
        console.log('Data inserted into MySQL:', result);
        res.status(200).send('Data inserted into MySQL');
    });
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Close MySQL connection when the application exits
process.on('exit', () => {
    connection.end((err) => {
        if (err) {
            console.error('Error closing MySQL connection:', err);
            return;
        }
        console.log('MySQL connection closed');
    });
});
