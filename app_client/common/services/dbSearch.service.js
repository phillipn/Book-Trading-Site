(function(){
  angular.module('bookstoreApp')
    .service('dbSearch', dbSearch);
  
  dbSearch.$inject = ['$http','authentication'];
  function dbSearch($http, authentication){
    var forGenres = function(){
      return $http.get('/api/genres');
    };
    
    var addMyBook = function(book){
      return $http.post('/api/books', book, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };
    
    var findBookId = function(bookid){
      return $http.get('/api/books/' + bookid, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };
    
    var findUserBooks = function(useremail){
      return $http.get('/api/books/?useremail=' + useremail);
    };
    
    var requestBook = function(bookid){
      return $http.post('/api/books/' + bookid, {}, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };
    
    var forBooks = function(genre){
      return $http.get('/api/books?genre=' + genre);
    };
    
    var updateRequest = function(bookid, requestid, choice){
      return $http.put('/api/books/' + bookid + '/requests/' + requestid, choice);
    }
    
    var getBooksByRequester = function(requesterEmail){
      return $http.get('/api/books/?requesterEmail=' + requesterEmail);
    }
    
    return {
      forBooks: forBooks,
      forGenres: forGenres,
      addMyBook: addMyBook,
      requestBook: requestBook,
      findBookId: findBookId,
      findUserBooks: findUserBooks,
      updateRequest: updateRequest,
      getBooksByRequester: getBooksByRequester
    }
  }
})();