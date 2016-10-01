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
    
    vm.checkApproval = function(request){
      return request.approval === "pending"
    }
    
    vm.getUserBooks = function(){
      dbSearch.findUserBooks(vm.currentUser.email)  
      .success(function(data) {
        vm.userBooks = data;
      })
      .error(function(err){
        vm.error = err;
      })
    }
    
    vm.getBooksByRequester = function(){
      dbSearch.getBooksByRequester(vm.currentUser.email)  
      .success(function(data) {
        console.log(data);
        vm.requestedBooks = data;
      })
      .error(function(err){
        vm.error = err;
      })
    }
    
    vm.colorApproval = function(approval){
      if(approval == 'pending'){
        return '';
      } else if(approval == 'approved'){
        return 'colorGreen';
      } else {
        return 'colorRed';
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
      
    vm.updateRequest = function(bookid, requestid, choice, index){
      dbSearch.updateRequest(bookid, requestid, choice)
      .success(function(data){
        vm.userBooks[index] = data;
      })
      .error(function(err){
        vm.error = err;
      })
    }
  
    vm.getUserBooks();
    vm.getBooksByRequester();
  }
})();