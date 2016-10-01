(function(){
  angular.module('bookstoreApp')
  .directive('userBookDiv', userBookDiv);
  
  function userBookDiv(){
    return{
      restrict: 'EA',
      templateUrl: '/common/directives/userBookDiv/userBook.template.html',
      controller: 'userBookCtrl as ubvm'
    };
  }
  
})();