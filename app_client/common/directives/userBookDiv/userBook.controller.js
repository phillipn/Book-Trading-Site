(function () {

  angular
    .module('bookstoreApp')
    .controller('userBookCtrl', userBookCtrl);
  
  userBookCtrl.$inject = ['authentication', 'dbSearch'];
  function userBookCtrl(authentication, dbSearch) {
    var ubvm = this;
    
    ubvm.currentUser = authentication.currentUser();
    
    ubvm.getUserBooks = function(){
      dbSearch.findUserBooks(ubvm.currentUser.email)  
      .success(function(data) {
        ubvm.userBooks = data;
      })
      .error(function(err){
        ubvm.error = err;
      })
    }
    
    
    ubvm.colorApproval = function(approval){
      if(approval == 'pending'){
        return '';
      } else if(approval == 'approved'){
        return 'colorGreen';
      } else {
        return 'colorRed';
      }
    }
    
    ubvm.checkApproval = function(request){
      return request.approval === "pending"
    }
    
    ubvm.updateRequest = function(bookid, requestid, choice, index){
      dbSearch.updateRequest(bookid, requestid, choice)
      .success(function(data){
        ubvm.userBooks[index] = data;
      })
      .error(function(err){
        ubvm.error = err;
      })
    }
    
    ubvm.getUserBooks();
  }
})();