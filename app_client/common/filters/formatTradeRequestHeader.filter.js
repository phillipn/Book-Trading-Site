(function () {
  
  angular
    .module('bookstoreApp')
    .filter('formatTradeRequestHeader', formatTradeRequestHeader);
  
  function formatTradeRequestHeader(){
    return function(numberOfTrades){
      if(numberOfTrades > 1 || numberOfTrades === 0){
        return numberOfTrades + ' trade requests';
      } else {
        return numberOfTrades + ' trade request';
      }
    }
  }
})();