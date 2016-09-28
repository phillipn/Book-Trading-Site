var googleBooks = require('google-books-search');
var mongoose = require('mongoose');
var Book = mongoose.model('Book');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

var options = {
  key: process.env.API_KEY,
  limit: 10
};

module.exports.searchForBooks = function(req, res){  
  googleBooks.search(req.query.book, options, function(err, results, apiResponse) {
    if (err) {
      console.log('error');
      sendJSONresponse(res, 400, err);
    } else {
      if(results.length === 0){
        sendJSONresponse(res, 400, "No results found. Try a better search term.");
      } else {
        sendJSONresponse(res, 200, results);
      }
    }
  });
}