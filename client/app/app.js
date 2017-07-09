var mainApp = angular.module("spymaster", ["ngRoute"]);

mainApp.config(function($routeProvider) {
  $routeProvider
      .when("/game", { controller: "GameBoardCtrl", templateUrl: "app/gameboard.html" })
      .when("/gameSpy/:gameSpyId", { controller: "GameBoardCtrl", templateUrl: "app/gameboard.html" })
      .otherwise({ controller: "LoginCtrl", templateUrl: "app/login.html" });
});