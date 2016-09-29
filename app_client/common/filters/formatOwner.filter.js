(function () {
  
  angular
    .module('bookstoreApp')
    .filter('formatOwner', formatOwner);
  
  function formatOwner(){
    return function(owner){
      if(!owner){ return; }
      return 'Owner: ' + owner.name + ' from ' + owner.city + ', ' + owner.state;
    }
  }
})();

