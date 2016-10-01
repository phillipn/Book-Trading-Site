(function(){
  angular.module('bookstoreApp')
  .directive('bookRequestDiv', bookRequestDiv);
  
  function bookRequestDiv(){
    return{
      restrict: 'EA',
      templateUrl: '/common/directives/bookRequestDiv/bookRequest.template.html',
      controller: 'bookRequestCtrl as brvm'
    };
  }
  
})();