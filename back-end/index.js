import express from "express";
import fs from "fs/promises";
import cors from 'cors';
const app = express();
const port = 3000;
app.use(cors());
// Middleware to parse JSON in the request body
app.use(express.json());

// Endpoint to handle POST requests
app.post('/api/signup', async (req, res) => {
    try {
        // Get the signup data from the request body
        const { username, password, email } = req.body;

        // Check if any of the fields are missing
        if (!username || !password || !email) {
            return res.status(400).send('Missing fields');
        }

        // Create an object with the signup data
        const userData = { username, password, email };

        // Read existing data from the 'database.json' file
        let existingData = [];
        try {
            const data = await fs.readFile('database.json', 'utf-8');
            existingData = JSON.parse(data);
        } catch (error) {
            console.error('Error reading database.json:', error);
        }

        // Append the new data to the array
        existingData.push(userData);

        // Write the updated array back to the 'database.json' file
        await fs.writeFile('database.json', JSON.stringify(existingData, null, 2));

        res.status(201).send('Data appended to database.json!');
    } catch (error) {
        console.error('Error handling signup:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
