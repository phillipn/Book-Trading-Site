(function () {
  
  angular
    .module('bookstoreApp')
    .filter('formatDescription', formatDescription);
  
  function formatDescription(){
    return function(description){
      return 'Description: ' + description;
    }
  }
})();