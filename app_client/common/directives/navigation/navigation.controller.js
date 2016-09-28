(function () {

  angular
    .module('bookstoreApp')
    .controller('navigationCtrl', navigationCtrl);

  function navigationCtrl($location, authentication) {
    var vm = this;

    vm.currentPath = $location.path();

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.currentUser = authentication.currentUser();

    vm.logout = function() {
      authentication.logout();
      vm.isLoggedIn = false;
      $location.search('search', null);
      $location.path('/login');
    };

  }
})();