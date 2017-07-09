(function(){

  function LoginCtrl($scope, $location, gameDataService) {
    $scope.newGame = function() {
      console.log("New Game!");
      $location.path("/game");
    };


    $scope.playAsSpy = function() {
      //console.log("SPY Game! " + $scope.spyGameId);
      $scope.errmsg = null;
      if ($scope.spyGameId) {
        gameDataService.getGameById($scope.spyGameId, function (err, gameData) {
            if (err) {
              $scope.errmsg = err.message;
              return;
            }
            else {
              $location.path("/gameSpy/" + $scope.spyGameId);
            }
        });
      }
    };


    $scope.gotoFAQ = function() {
      console.log("README!");
    };

  }

  mainApp.controller("LoginCtrl", LoginCtrl);
})();


