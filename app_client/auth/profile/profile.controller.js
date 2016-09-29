(function () {
  
  angular
    .module('bookstoreApp')
    .controller('profileCtrl', profileCtrl);
  
  profileCtrl.$inject = ['authentication'];
  function profileCtrl(authentication){
    var vm = this;
    
    vm.currentUser = authentication.currentUser();
    
    vm.pageHeader = {
      title: vm.currentUser.name + ',',
      strapline: 'Feel free to change your information below...'
    }
    
    vm.credentials = {
      password : "",
      newPassword : ""
    };
    
    vm.location = {
      city : "",
      state : ""
    };
    
    vm.changePassword = function(){
      vm.credentials.email = vm.currentUser.email;
      vm.message = '';
      vm.error = '';
      authentication.changePassword(vm.credentials)
        .success(function(data) {
          vm.message = "Password Changed";
        })
        .error(function(err){
          vm.error = err.message;
        })
      return false;
    }
    
    vm.changeAddress = function(){
      vm.location.email = vm.currentUser.email;
      vm.message = '';
      vm.error = '';
      authentication.changeLocation(vm.location)
        .success(function(data) {
          vm.message = "Location Changed";
        })
        .error(function(err){
          vm.error = err.message;
        })
      return false;
    }
  }
  
})();