const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;
// Middleware
app.use(cors());
app.use(bodyParser.json());
// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',        // Default username (change if different)
  password: '',        // Your MySQL password (empty if not set)
  database: 'pawfectcare' // Must match the database name
});
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});
// API to receive Contact Us form data
app.post('/contact', (req, res) => {
    const { name, email, phone, message } = req.body;
    const sql = "INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, email, phone, message], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error');
        }
        res.status(200).send('Message saved successfully!');
    });
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

