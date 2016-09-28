var mongoose = require('mongoose');

var ownerSchema = new mongoose.Schema({
  email: String,
  name: String,
  city: String,
  state: String
});

var booksSchema = new mongoose.Schema({
  title: String,
  author: String,
  categories: String,
  thumbnail: String, 
  preview: String,
  owner: [ownerSchema]
});

mongoose.model('Book', booksSchema);