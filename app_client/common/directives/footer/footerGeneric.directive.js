(function(){
  angular.module('bookstoreApp')
    .directive('footerGeneric', footerGeneric);
  
  function footerGeneric(){
    return{
      templateUrl: '/common/directives/footer/footerGeneric.template.html'
    }; 
  }
  
})();