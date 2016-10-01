(function () {

  angular
    .module('bookstoreApp')
    .controller('bookRequestCtrl', bookRequestCtrl);
  
  bookRequestCtrl.$inject = [];
  function bookRequestCtrl() {
    var brvm = this;

    brvm.colorApproval = function(approval){
      if(approval == 'pending'){
        return '';
      } else if(approval == 'approved'){
        return 'colorGreen';
      } else {
        return 'colorRed';
      }
    }

  }
})();