const mongoose = require('mongoose');

const worksheetSchema = new mongoose.Schema({
  question: String,
  options: [
    {
      option: String,
      correct: Boolean,
    },
  ],
});

const Worksheet = mongoose.model('Worksheet', worksheetSchema);

module.exports = Worksheet;