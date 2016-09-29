(function () {

  angular
    .module('bookstoreApp')
    .controller('loginCtrl', loginCtrl);
  
  loginCtrl.$inject = ['$location', 'authentication'];
  function loginCtrl($location, authentication) {
    var vm = this;

    vm.pageHeader = {
      title: 'Sign in to Nick\'s Bookstore'
    };

    vm.credentials = {
      email : "",
      password : ""
    };
    
    vm.returnPage = $location.search().page || '/';

    vm.onSubmit = function () {
      vm.formError = "";
      if (!vm.credentials.email || !vm.credentials.password) {
        vm.formError = "All fields required, please try again";
        return false;
      } else {
        vm.doLogin();
      }
    };

    vm.doLogin = function() {
      vm.formError = "";
      authentication
        .login(vm.credentials)
        .error(function(err){
          vm.formError = err;
        })
        .then(function(){
          if(vm.returnPage == '/login'){
            $location.path('/');
          } else {
            $location.path(vm.returnPage);
          }
        })
    };
  }

})();