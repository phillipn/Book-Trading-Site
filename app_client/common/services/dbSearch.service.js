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
    
    return {
      forBooks: forBooks,
      forGenres: forGenres,
      addMyBook: addMyBook,
      requestBook: requestBook,
      findBookId: findBookId
    }
  }
})();