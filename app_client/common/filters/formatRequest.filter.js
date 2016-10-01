(function () {
  
  angular
    .module('bookstoreApp')
    .filter('formatRequest', formatRequest);
  
  function formatRequest(){
    return function(request){
      if(request.approval =="pending"){
        return request.name + ' from ' + request.city + ', ' + request.state;
      } else if(request.approval =="approved"){
        return request.name + ' from ' + request.city + ', ' + request.state + '. Send an email to ' + request.email + ' to coordinate trade.';
      } else {
        return request.name + ' from ' + request.city + ', ' + request.state + '. Trade rejected.';
      }
    }
  }
})();