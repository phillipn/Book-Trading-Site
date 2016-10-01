(function () {
  
  angular
    .module('bookstoreApp')
    .controller('bookCtrl', bookCtrl);
  
  bookCtrl.$inject = ['$anchorScroll', '$location', '$routeParams', 'authentication', 'dbSearch'];
  function bookCtrl($anchorScroll, $location, $routeParams, authentication, dbSearch){
    var vm = this;
    
    vm.bookId = $routeParams.bookid;
    
    vm.currentUser = authentication.currentUser();
    
    vm.pageHeader = {
      title: "Book Information"
    }
    
    vm.clickLink = 'Click to see book preview!';
    
    vm.ownBook = false;
    
    vm.toggleButton = function(text, buttonClass){
      vm.buttonText = text;
      vm.buttonClass = buttonClass;
    }
    
    vm.goToTop = function(){
      $location.hash = 'alert1';
      $anchorScroll();
    }
    
    dbSearch.findBookId(vm.bookId)
      .success(function(data){
        if(data.tradeRequests[0] === false){
          vm.toggleButton('You have already requested this book', 'btn btn-danger');
          vm.book = data;
          return false;
        } else if(data.owner.email === vm.currentUser.email){
          vm.book = data;
          vm.ownBook = true;
          return false;
        } else {
          vm.toggleButton('Request trade!', 'btn btn-success');
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
          vm.toggleButton('You have already requested this book', 'btn btn-danger');
          vm.message = "Trade request has been sent to " + data.owner.name;
        })
        .error(function(err){
          console.log(err);
          vm.error = err;
        })
      return false;
    } 
    
  }
  
})()