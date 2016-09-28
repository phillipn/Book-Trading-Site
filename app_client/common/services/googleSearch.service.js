(function(){
  angular.module('bookstoreApp')
    .service('googleSearch', googleSearch);
  
  function googleSearch($http){
    var forBooks = function(search){
      return $http.get('/api/google/books?book=' + search);
    }
    
    return {
      forBooks: forBooks
    }
  }
})();