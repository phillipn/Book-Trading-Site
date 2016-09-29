(function () {
  
  angular
    .module('bookstoreApp')
    .filter('formatAuthor', formatAuthor);
  
  function formatAuthor(){
    return function(author){
      return 'Author: ' + author;
    }
  }
})();