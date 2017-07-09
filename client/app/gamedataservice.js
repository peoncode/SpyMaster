/*
   GameDataService
*/
(function(){

  function gameDataService($http) {

    this.getNewData = function(callback) {
      $http.get("/v1/gameData.json")
           .success(function (data, status, headers, conf) {
              callback(null, data);
           })
           .error(function (data, status, headers, conf) {
              callback(data);
           });
    };


    this.getGameById = function(gameId, callback) {
      $http.get("/v1/gameData.json/" + gameId)
           .success(function (data, status, headers, conf) {
              //reveal all cards for SpyMaster
              var cardList = data.cardList;
              for (var i in cardList) {
                cardList[i].cardColor = cardList[i].team + "card";
                cardList[i].isRevealed = true;
              }
              callback(null, data);
           })
           .error(function (data, status, headers, conf) {
              callback(data);
           });
    };

    this.deleteGame = function(gameId) {
        $http.delete("/v1/game/" + gameId);
    };

  }

  mainApp.service('gameDataService', gameDataService);

})();
