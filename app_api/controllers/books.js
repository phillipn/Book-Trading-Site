var mongoose = require('mongoose');
var Book = mongoose.model('Book');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.searchForBooks = function(req, res){
  var genre = req.query.genre;
  var userEmail = req.query.useremail;
  if(genre){
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
  } else {
    Book.find({}).exec(function(err, books){
      var bookArr = [];
      if(err || !books){
        sendJSONresponse(res, 400, err);
      } else {
        books.forEach(function(book){
          if(book.owner.email === userEmail){
            bookArr.push(book);
          }
        })
        sendJSONresponse(res, 200, bookArr);
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
  Book.findById(bookid)
    .select('tradeRequests owner')
    .exec(
      function(err, book) {
        var save = true;
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
            save = false;
            return;
          }
        })
        if(save === true){
          book.tradeRequests.push({
            name: req.payload.name, 
            email: req.payload.email, 
            city: req.payload.city, 
            state: req.payload.state,
            approval: "pending"
          });
          book.save(function(err, book) {
            if (err) {
              sendJSONresponse(res, 404, err);
            } else {
              sendJSONresponse(res, 200, book);
            }
          });
        } else {
          sendJSONresponse(res, 400, "You have already requested this book");
        }
    })
}

module.exports.updateRequest = function(req, res){
  var bookid = req.params.bookid;
  var requestid = req.params.requestid;
  var choice = req.body.choice;
  var thisRequest;
  Book.findById(bookid).exec(function(err, book){
    if(!book || err){
      sendJSONresponse(res, 404, "Book not found");
      return;
    }
    thisRequest = book.tradeRequests.id(requestid);

    if(!thisRequest || err){
      sendJSONresponse(res, 404, "Request not found");
      return;
    }
    if(choice === "approved"){
      book.tradeRequests.forEach(function(request){
        request.approval = "rejected";
      });
    }
    thisRequest.approval = choice;
    book.save(function(err, book){
      if (err) {
        sendJSONresponse(res, 404, err);
      } else {
        sendJSONresponse(res, 200, book);
      } 
    })
  })
}

module.exports.getBooksByRequester = function(req, res){
  var userEmail = req.params.userEmail;
  var bookArr = [];
  Book.find({}).select('title owner tradeRequests thumbnail').exec(function(err, books){
    if(!books || err){
      sendJSONresponse(res, 404, "Book not found");
      return;
    }
    books.forEach(function(book){
      book.tradeRequests.forEach(function(request){
        if(request.email === userEmail){
          bookArr.push({title: book.title, thumbnail: book.thumbnail, owner: book.owner, approval: request.approval});
        }
      })
    })
    sendJSONresponse(res, 200, bookArr);
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