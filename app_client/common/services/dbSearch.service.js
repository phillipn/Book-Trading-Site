(function(){
  angular.module('bookstoreApp')
    .service('dbSearch', dbSearch);
  
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
    
    var requestBook = function(user){
      return $http.post('/api/books/users', user);
    };
    
    var forBooks = function(genre){
      return $http.get('/api/books?genre=' + genre);
    };
    
    return {
      forBooks: forBooks,
      forGenres: forGenres,
      addMyBook: addMyBook,
      requestBook: requestBook
    }
  }
})();