var mongoose = require('mongoose');
var Book = mongoose.model('Book');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.searchForBooks = function(req, res){
  var genre = req.query.genre;
  if(genre === 'All Genres'){
    Book.find({}).exec(function(err, records){
      if(err){
        sendJSONresponse(res, 400, err);
      } else {
        sendJSONresponse(res, 200, records);
      }
    })
  } else {
    Book.find({categories: genre}).exec(function(err, records){
      if(err){
        sendJSONresponse(res, 400, err);
      } else {
        sendJSONresponse(res, 200, records);
      }
    })
  }
}

module.exports.addMyBook = function(req, res){
  var book = req.body;
  Book.create({
    title: book.title,
    author: book.author,
    categories: book.categories,
    thumbnail: book.thumbnail,
    preview: book.link,
    owner: {
      name: req.payload.name, 
      email: req.payload.email, 
      city: req.payload.city, 
      state: req.payload.state
    }       
   }, function(err, result){
     if(err){
       sendJSONresponse(res, 400, err);
     } else {
       sendJSONresponse(res, 201, result);
     }
   })
}

module.exports.requestBook = function(req, res){
  console.log(req.body);
}

module.exports.searchForGenres = function(req, res){
  Book.find({}).distinct('categories').exec(function(err, genres){
    if(err){
      sendJSONresponse(res, 400, err);
    } else {
      sendJSONresponse(res, 200, genres);
    }
  })
}