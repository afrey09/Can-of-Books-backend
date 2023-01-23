'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
app.use(cors());
app.use(express.json());
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

app.post('/books', createBook);

async function createBook(request, response, next) {
  try {
    let createdBook = await Book.create(request.body);

    response.status(200).send(createdBook);

  } catch (error) {
    console.log(error.message);
    next(error);
  }
}

app.delete('/books/:bookId', deleteBook);

async function deleteBook(request, response, next) {
  try {
    let id = request.params.bookId;

    await Book.findByIdAndDelete(id);

    response.status(200).send('Book deleted');

  } catch (error) {
    console.log(error.message);
    next(error);
  }
}


