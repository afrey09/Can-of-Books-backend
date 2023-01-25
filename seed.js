'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);

const Book = require('./Models/book.js');
async function seed() {

  await Book.create({
    title: 'Code 101',
    description: 'hello world!',
    status: 'checked out',
  });
  console.log(`Code 101`);

  await Book.create({
    title: 'Code 102',
    description: 'hello class',
    status: 'checked in',
  });
  console.log(`Code 102`);

  await Book.create({
    title: 'Code 201',
    description: 'good luck',
    status: 'in progress',
  });
  console.log(`Code 201`);


  mongoose.disconnect();
}

seed();
