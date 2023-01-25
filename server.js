'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Book = require('./Models/book.js');

app.use(cors());
app.use(express.json());


// MongoDB Connection

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

// Server Connection

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`listening on ${PORT}`));

// Endpoints

app.get('/test', (request, response) => {
  response.send('test request received');
});



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
app.put('/books/:bookId', updateBook);

async function updateBook(request, response, next) {
  try {
    let id = request.params.bookId;

    let frontenddata = request.body;

    const updatedBook = await Book.findByIdAndUpdate(id, frontenddata, { new: true, overwrite: true });

    response.status(200).send(updatedBook);

  } catch (error) {
    console.log(error.message);
    next(error);
  }
}
