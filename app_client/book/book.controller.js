(function () {
  
  angular
    .module('bookstoreApp')
    .controller('bookCtrl', bookCtrl);
  
  bookCtrl.$inject = ['$routeParams', 'authentication', 'dbSearch'];
  function bookCtrl($routeParams, authentication, dbSearch){
    var vm = this;
    
    vm.bookId = $routeParams.bookid;
    
    vm.currentUser = authentication.currentUser();
    
    vm.pageHeader = {
      title: "Book Information"
    }
    
    vm.clickLink = 'Click to see book preview!';
    
    vm.ownBook = false;
    
    dbSearch.findBookId(vm.bookId)
      .success(function(data){
        if(data.tradeRequests[0] === false){
          vm.buttonText = 'You have already requested this book';
          vm.buttonClass='btn btn-danger';
          vm.requested = true;
          vm.book = data;
          return false;
        } else if(data.owner.email === vm.currentUser.email){
          vm.book = data;
          vm.ownBook = true;
          return false;
        } else {
          vm.buttonText = 'Request trade!';
          vm.buttonClass='btn btn-success';
          vm.book = data;
        }
      })
      .error(function(err){
        vm.error = err;
      })
    
    vm.requestBook = function(bookid){
      vm.error = '';
      vm.message = '';
      dbSearch.requestBook(bookid)
        .success(function(data) {
          vm.message = "Trade request has been sent to " + data.owner.name;
        })
        .error(function(err){
          vm.error = err;
        })
      return false;
    } 
    
  }
  
})()