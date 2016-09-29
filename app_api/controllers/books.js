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
      console.log(records);
      if(err){
        sendJSONresponse(res, 400, err);
      } else {
        sendJSONresponse(res, 200, records);
      }
    })
  }
}

module.exports.findBook = function(req, res){
  if(req.params && req.params.bookid) {
    Book.findById(req.params.bookid)
    .exec(function(err, book) {
      if (!book) {
        sendJSONresponse(res, 404, {
          "message": "bookid not found"
        });
        return;
      } else if (err) {
        console.log(err);
        sendJSONresponse(res, 404, err);
        return;
      }

      book.tradeRequests.some(function(request, i){
        if(request.email == req.payload.email){
          // DIRTY DIRTY HACK - Preferably I would set a totally, separate virtual attribute to say "Hey, this user has already inquired about this book. I need to figure out how to do that." 
          book.tradeRequests = false;
          return true;
        }
      })
      sendJSONresponse(res, 200, book);
    });
  } else {
    sendJSONresponse(res, 404, "No book found");
  }
}

module.exports.addMyBook = function(req, res){
  var book = req.body;
  console.log(book);
  
  if(!book.averageRating){
    book.averageRating = 0;
    book.ratingsCount = 0;
  }
  
  Book.create({
    title: book.title,
    author: book.authors,
    categories: book.categories,
    rating: [book.averageRating, book.ratingsCount],
    language: book.language,
    description: book.description,
    thumbnail: book.thumbnail,
    preview: book.link,
    owner: {
      name: req.payload.name, 
      email: req.payload.email, 
      city: req.payload.city, 
      state: req.payload.state
    },
    tradeRequests: []      
   }, function(err, result){
     if(err){
       sendJSONresponse(res, 400, err);
     } else {
       sendJSONresponse(res, 201, result);
     }
   })
}

module.exports.requestBook = function(req, res){
  var bookid = req.params.bookid;
  console.log(req.payload);
  Book.findById(bookid)
    .select('tradeRequests owner')
    .exec(
      function(err, book) {
        if (!book) {
          sendJSONresponse(res, 404, {
            "message": "bookid not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }
        
        if(book.owner.email == req.payload.email){
          sendJSONresponse(res, 400, "You cannot request your own book");
          return;
        }
        
        book.tradeRequests.some(function(request, i){
          if(request.email == req.payload.email){
            // DIRTY DIRTY HACK - Preferably I would set a totally, separate virtual attribute to say "Hey, this user has already inquired about this book. I need to figure out how to do that." 
            sendJSONresponse(res, 400, "You already requested this book");
            return;
          }
        })
        
        book.tradeRequests.push({
          name: req.payload.name, 
          email: req.payload.email, 
          city: req.payload.city, 
          state: req.payload.state
        });
        book.save(function(err, book) {
          if (err) {
            sendJSONresponse(res, 404, err);
          } else {
            sendJSONresponse(res, 200, book);
          }
        });
    })
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