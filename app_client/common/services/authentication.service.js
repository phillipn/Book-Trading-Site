(function () {

  angular
    .module('bookstoreApp')
    .service('authentication', authentication);

  function authentication ($http, $window) {

    var saveToken = function (token) {
      $window.localStorage['bookstore_token'] = token;
    };

    var getToken = function () {
      return $window.localStorage['bookstore_token'];
    };

    var isLoggedIn = function() {
      var token = getToken();

      if(token){
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    var currentUser = function() {
      if(isLoggedIn()){
        var token = getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        return {
          email : payload.email,
          name : payload.name,
          city: payload.city,
          state: payload.state
        };
      }
    };

    register = function(user) {
      return $http.post('/api/register', user).success(function(data){
        saveToken(data.token);
      });
    };

    login = function(user) {
      return $http.post('/api/login', user).success(function(data) {
        saveToken(data.token);
      });
    };
    
    changePassword = function(user) {
      return $http.post('/api/changePassword', user);
    };
    
    changeLocation = function(user) {
      return $http.post('/api/changeLocation', user);
    };

    logout = function() {
      $window.localStorage.removeItem('bookstore_token');
    };

    return {
      currentUser : currentUser,
      saveToken : saveToken,
      getToken : getToken,
      isLoggedIn : isLoggedIn,
      register : register,
      login : login,
      logout : logout,
      changePassword: changePassword,
      changeLocation: changeLocation
    };
  }


})();