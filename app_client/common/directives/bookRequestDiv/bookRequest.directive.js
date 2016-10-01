(function(){
  angular.module('bookstoreApp')
  .directive('bookRequestDiv', bookRequestDiv);
  
  function bookRequestDiv(){
    return{
      restrict: 'EA',
      scope: {
        thisBook : '=book'
      },
      templateUrl: '/common/directives/bookRequestDiv/bookRequest.template.html',
      controller: 'bookRequestCtrl as brvm'
    };
  }
  
})();