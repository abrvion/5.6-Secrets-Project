import express from "express";
import axios from "axios";



// Get the current file path and directory

const app = express();
const PORT = process.env.PORT || 3000;

// Set the public folder for static files
app.use(express.static("public"));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Route for the home page
app.get('/', async (req, res) => {
    try {
        // Use axios to get a random secret
        const response = await axios.get('https://secrets-api.appbrewery.com/random');
        const secretData = response.data;

        // Render index.ejs and pass the secret and username
        res.render('index', { secret: secretData.secret, user: secretData.username });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching secret');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
