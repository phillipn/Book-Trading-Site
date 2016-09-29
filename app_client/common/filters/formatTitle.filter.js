(function () {
  
  angular
    .module('bookstoreApp')
    .filter('formatTitle', formatTitle);
  
  function formatTitle(){
    return function(title){
      return 'Title: ' + title;
    }
  }
})();