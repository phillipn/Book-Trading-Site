(function () {

  angular
    .module('bookstoreApp')
    .controller('bookRequestCtrl', bookRequestCtrl);
  
  bookRequestCtrl.$inject = ['dbSearch', 'authentication'];
  function bookRequestCtrl(dbSearch, authentication) {
    var brvm = this;

    brvm.currentUser = authentication.currentUser();
    
    brvm.colorApproval = function(approval){
      if(approval == 'pending'){
        return '';
      } else if(approval == 'approved'){
        return 'colorGreen';
      } else {
        return 'colorRed';
      }
    }
    
    
    brvm.getBooksByRequester = function(){
      dbSearch.getBooksByRequester(brvm.currentUser.email)  
      .success(function(data) {
        brvm.requestedBooks = data;
      })
      .error(function(err){
        brvm.error = err;
      })
    }
    
    brvm.getBooksByRequester();

  }
})();