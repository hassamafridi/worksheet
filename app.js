const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors middleware
const app = express();

app.use(bodyParser.json());

app.use(morgan('dev'));
// Enable CORS for all routes
app.use(cors());
// Import the Worksheet model
const Worksheet = require('./worksheet');

// Connect to your MongoDB database
mongoose.connect('mongodb://localhost:27017/worksheets', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define your API routes here
app.post('/worksheets', async (req, res) => {
    try {
      const { question, options } = req.body;
      const worksheet = new Worksheet({ question, options });
      await worksheet.save();
      res.status(201).json(worksheet);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to save worksheet' });
    }
  });
  
  // Retrieve worksheets
  app.get('/worksheets', async (req, res) => {
    try {
      const worksheets = await Worksheet.find();
      console.log(worksheets); // Log the worksheets before sending the response
      res.status(200).json(worksheets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve worksheets' });
    }
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
module.exports = app;
