(function(){
  angular.module('bookstoreApp')
  .controller('homeCtrl', homeCtrl);
  
  homeCtrl.$inject = ['$http','googleSearch','dbSearch'];
  function homeCtrl($http, googleSearch, dbSearch){
    var vm = this;
    
    vm.genres = function(){
      dbSearch.forGenres()
        .success(function(data) {
           vm.genres = data;
        })
        .error(function(err){
          vm.error = err;
        })
      return false;
    }
    
    vm.genres();
    
    vm.pageHeader = {
      title: 'Welcome Readers',
      strapline: 'Check out our user\'s collections'
    }
    
    vm.emphasize = function(input){
      if(input === 'titleDiv'){
        vm.genreDivHide = true;
        vm.titleDivHide = false;
      } else {
        vm.titleDivHide = true;
        vm.genreDivHide = false;
      }
    }
    
    vm.searchBooks = function(title){
      vm.error = '';
      vm.userBooks = '';
      vm.googleBooks = '';
      vm.message = '';
      googleSearch.forBooks(title)
        .success(function(data) {
          vm.googleBooks = data;
        })
        .error(function(err){
          console.log(err);
          vm.error = err;
        })
      return false;
    }
    
    vm.addBook = function(info){
      vm.error = '';
      vm.userBooks = '';
      vm.googleBooks = '';
      vm.message = '';
      dbSearch.addMyBook(info)
        .success(function(data) {
          vm.message = "Book added to your collection";
        })
        .error(function(err){
          vm.error = err;
        })
      return false;
    }
    
    vm.getUserBooks = function(genre){
      vm.error = '';
      vm.userBooks = '';
      vm.googleBooks = '';
      vm.message = '';
      genre = encodeURIComponent(genre);
      dbSearch.forBooks(genre)
        .success(function(data) {
           vm.userBooks = data;
        })
        .error(function(err){
          vm.error = err;
        })
      return false;
    }
  }
})();