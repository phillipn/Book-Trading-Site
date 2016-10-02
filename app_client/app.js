(function(){
  
  angular.module('bookstoreApp', ['ngSanitize', 'ngRoute']);

  function config($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: "/home/home.view.html",
        controller: 'homeCtrl',
        controllerAs: "vm"
      })
      // .when('/book/:bookid', {
      //   templateUrl: "/book/book.view.html",
      //   controller: 'bookCtrl',
      //   controllerAs: "vm"
      // })
      // .when('/login', {
      //   templateUrl: "/auth/login/login.view.html",
      //   controller: 'loginCtrl',
      //   controllerAs: "vm"
      // })
      // .when('/register', {
      //   templateUrl: "/auth/register/register.view.html",
      //   controller: 'registerCtrl',
      //   controllerAs: "vm"
      // })
      // .when('/profile', {
      //   templateUrl: "/auth/profile/profile.view.html",
      //   controller: 'profileCtrl',
      //   controllerAs: "vm"
      // })
      // .when('/user/:userid', {
      //   templateUrl: "/auth/trades/trades.view.html",
      //   controller: 'tradesCtrl',
      //   controllerAs: "vm"
      // })
      // .otherwise({redirectTo: '/'});
  }
  
  angular.module('bookstoreApp')
    .config(['$routeProvider', config])
})();