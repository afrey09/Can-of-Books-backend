'Use Strict';

const mongoose = require ('mongoose');
const {Schema} = mongoose;

// schema is the structure of the document

const bookSchema = new Schema ({
  title: { type: String, required: true},
  description: { type: String, required: true},
  status: { type: String, required: true},
});

// book is the name of the collection
const BookModel = mongoose.model('book', bookSchema);


module.exports = BookModel;
