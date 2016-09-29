(function () {
  
  angular
    .module('bookstoreApp')
    .filter('formatReview', formatReview);
  
  function formatReview(){
    return function(reviewArray){
      if(!reviewArray){ return; }
      return 'Review: ' + reviewArray[0] + ' out of 5 with ' + reviewArray[1] + ' total reviews.';
    }
  }
})();