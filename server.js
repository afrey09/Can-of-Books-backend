'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
app.use(cors());
const Book = require('./Models/book.js');
mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

const PORT = process.env.PORT || 3001;

app.get('/test', (request, response) => {

  response.send('test request received');

});

app.listen(PORT, () => console.log(`listening on ${PORT}`));

app.get('/books', getBooks);

async function getBooks(request, response, next) {
  try {
    let allBooks = await Book.find({});

    response.status(200).send(allBooks);

  } catch (error) {
    console.log(error.message);
    next(error);
  }
}
