(function () {

  angular
    .module('bookstoreApp')
    .controller('tradesCtrl', tradesCtrl);
  
  tradesCtrl.$inject = ['authentication', 'dbSearch'];
  function tradesCtrl(authentication, dbSearch) {
    var vm = this;
    
    vm.pageHeader = {
      title: 'Trade Central'
    }
    
    vm.currentUser = authentication.currentUser();
    
    vm.toggleRequestDivs = function(selection){
      if(selection == 'inbox'){
        vm.requestOutbox = false;
        vm.requestInbox = true;
      } else {
        vm.requestOutbox = true;
        vm.requestInbox = false;
      }
    }

    vm.orderByApproval = function(book){
      if(book.approval === 'pending'){
        return 0;
      } else if(book.approval === 'approved'){
        return 2;
      } else {
        return 1;
      }
    }
      
  }
})();