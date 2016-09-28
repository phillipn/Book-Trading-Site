(function () {

  angular
    .module('bookstoreApp')
    .controller('registerCtrl', registerCtrl);

  function registerCtrl($location, authentication) {
    var vm = this;

    vm.pageHeader = {
      title: 'Create a new Bookstore account'
    };

    vm.credentials = {
      name : "",
      email : "",
      city : "",
      state : "",
      password : ""
    };

    vm.returnPage = $location.search().page || '/';

    vm.onSubmit = function () {
      vm.formError = "";
      if (!vm.credentials.name || !vm.credentials.email || !vm.credentials.password || !vm.credentials.city || !vm.credentials.state) {
        vm.formError = "All fields required, please try again";
        return false;
      } else {
        vm.doRegister();
      }
    };

    vm.doRegister = function() {
      vm.formError = "";
      authentication
        .register(vm.credentials)
        .error(function(err){
          vm.formError = err;
        })
        .then(function(){ 
          if(vm.returnPage == '/login'){
            $location.path('/');
          } else {
            $location.path(vm.returnPage);
          }
        });
    };

  }

})();