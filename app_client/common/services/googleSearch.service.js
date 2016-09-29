(function(){
  angular.module('bookstoreApp')
    .service('googleSearch', googleSearch);
  
  googleSearch.$inject = ['$http'];
  function googleSearch($http){
    var forBooks = function(search){
      return $http.get('/api/google/books?book=' + search);
    }
    
    return {
      forBooks: forBooks
    }
  }
})();