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
    
    vm.getUserBooks = function(){
      dbSearch.findUserBooks(vm.currentUser.email)  
      .success(function(data) {
        console.log(data);
        vm.userBooks = data;
      })
      .error(function(err){
        vm.error = err;
      })
    }
    
    vm.getBooksByRequester = function(){
      dbSearch.getBooksByRequester(vm.currentUser.email)  
      .success(function(data) {
        vm.requestedBooks = data;
      })
      .error(function(err){
        vm.error = err;
      })
    }
      
    vm.updateRequest = function(bookid, requestid, choice){
      dbSearch.updateRequest(bookid, requestid, choice)
        .success(function(data) {
          console.log(data);
        })
        .error(function(err){
          vm.error = err;
        })
      return false;
    }
  
    vm.getUserBooks();
    vm.getBooksByRequester();
  }
})();