
(function() {

function GameBoardCtrl($scope, gameDataService, $routeParams) {
   
  $scope.revealCard = function(index) {
    var card = $scope.cardList[index];

    //console.log("reveal pressed: " + card.name + " [" + card.team + "]");
    card.cardColor = card.team + "card";
    card.isRevealed = true;

    if (card.team == "blue") {
      $scope.blueCardsOpen++;  //Blue team scores!

      if (($scope.whoStarts == "blue" && $scope.blueCardsOpen == 9) ||
          ($scope.whoStarts == "red" && $scope.blueCardsOpen == 8)) {
        blueWins();
        roundOver();
        return;
      }
    }
    else if (card.team == "red") {
      $scope.redCardsOpen++;  //Red team scores!

      if (($scope.whoStarts == "red" && $scope.redCardsOpen == 9) ||
          ($scope.whoStarts == "blue" && $scope.redCardsOpen == 8)) {
        redWins();
        roundOver();
        return;
      }
    }
    else if (card.team == "black") {  //black card! GG
      if ($scope.whosTurn == "red") {
        blueWins();
      }
      else {
        redWins();
      }

      roundOver();
      return;
    }  

    //after one card, switch teams
    $scope.whosTurn = $scope.whosTurn == "red" ? "blue" : "red";
  }

  function blueWins() {
    $scope.blueWins = true;
    $scope.blueScore++;
  }

  function redWins() {
    $scope.redWins = true;
    $scope.redScore++;
  }

  function roundOver() {
    for (var i in $scope.cardList) {
      $scope.cardList[i].isRevealed = true;
    }
  
    $scope.whosTurn = "";
    if ($scope.blueWins) {
      console.log("Game over. BLUE wins!");
    }
    else {
      console.log("Game over. RED wins!");
    }

    gameDataService.deleteGame($scope.gameId);

    $scope.gameRound++;
  }

  $scope.newRound = function(gameId) {
    // console.log("Preparing New round");
    if (gameId) {
       $scope.isSpyMaster = true;
       $scope.gameId = gameId;
       gameDataService.getGameById(gameId, function (err, gameData) {
          if (err) {
            $scope.page_load_error = "Unexpected error loading game data: " + err.message;
            return;
          }
          else {
            $scope.whoStarts = gameData["whoStarts"];
            $scope.cardList = JSON.parse(JSON.stringify(gameData["cardList"]));
            $scope.blueCardsOpen = 0;
            $scope.redCardsOpen = 0;
            $scope.blueWins = false;
            $scope.redWins = false;
            $scope.whosTurn = $scope.whoStarts;

            console.log("SpyMaster monitoring [" + $scope.gameId + "]");
          }
       });
    }
    else
    {
      gameDataService.getNewData(function (err, gameData) {
        if (err) {
          $scope.page_load_error = "Unexpected error loading game data: " + err.message;
          return;
        }
        else {
          $scope.gameId = gameData["gameId"];
          $scope.whoStarts = gameData["whoStarts"];
          $scope.cardList = JSON.parse(JSON.stringify(gameData["cardList"]));
          $scope.blueCardsOpen = 0;
          $scope.redCardsOpen = 0;
          $scope.blueWins = false;
          $scope.redWins = false;
          $scope.whosTurn = $scope.whoStarts;

          console.log("Starting Round " + $scope.gameRound + " [" + $scope.gameId + "]");
        }
      });  
    }
  }

  $scope.gameRound = 1;
  $scope.blueScore = 0;
  $scope.redScore = 0;
  $scope.newRound($routeParams.gameSpyId);
}

mainApp.controller('GameBoardCtrl', GameBoardCtrl);
})();


