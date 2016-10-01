var mongoose = require('mongoose');

var ownerSchema = new mongoose.Schema({
  email: String,
  name: String,
  city: String,
  state: String
});

var tradeSchema = new mongoose.Schema({
  email: String,
  name: String,
  city: String,
  state: String,
  approval: String
});

var booksSchema = new mongoose.Schema({
  title: String,
  author: String,
  categories: {
    type: String,
    index: true
  },
  rating: [Number],
  description: String,
  language: String,
  thumbnail: String, 
  preview: String,
  owner: ownerSchema,
  tradeRequests: [tradeSchema]
});

mongoose.model('Book', booksSchema);