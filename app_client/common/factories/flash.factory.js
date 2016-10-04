(function(){
  angular.module('bookstoreApp')
    .factory('Flash', Flash);

  function Flash(){
    var success = {},
        error = {},
        alert = false;
    return {
      getSuccess: function () {
        return success;
      },
      setSuccess: function (value) {
        success = value;
        alert = true;
      },
      getError: function () {
        return error;
      },
      setError: function (value) {
        error = value;
        alert = true;
      },
      reset: function () {
        success = {};
        error = {};
        alert = false;
      },
      hasAlert: function () {
        return alert;
      }
    }
  }
})();
