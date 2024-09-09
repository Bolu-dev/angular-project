var app = angular.module("myApp", ["ngRoute", "ngAnimate"]);

//creating a config route and dependencies
app.config([
  "$routeProvider",
  "$locationProvider",
  function ($routeProvider, $locationProvider) {
    //using $locationProvider for cleaner URLs
    $locationProvider.html5Mode(false);

    //using views and route
    $routeProvider
      .when("/home", {
        templateUrl: "views/home.html",
        controller: "myController",
      })
      .when("/contact", {
        templateUrl: "views/contact.html",
        controller: "contactController",
      })
      .when("/thanks", {
        templateUrl: "views/thanks.html",
        controller: "contactController",
      })
      .when("/directory", {
        templateUrl: "views/directory.html",
        controller: "myController",
      })
      .otherwise({
        redirectTo: "/home",
      });
  },
]);
//
// controller
app.controller("myController", [
  "$scope",
  "$http",
  function ($scope, $http) {
    //a scope function to remove an abject from the array below(ng-click)
    $scope.removeNinja = function (list) {
      let removed = $scope.ninjas.indexOf(list);
      $scope.ninjas.splice(removed, 1);
    };
    //
    //a scope func to add new ninja from the form(HTML)"ng-sumit"
    $scope.addninja = function () {
      $scope.ninjas.push({
        name: $scope.newninja.name,
        belt: $scope.newninja.belt,
        rate: $scope.newninja.rate,
        available: true,
        thumb: "ninja.jpg",
      });
      //logic for clearing the input field once the form has been submitted
      $scope.newninja.name = "";
      $scope.newninja.belt = "";
      $scope.newninja.rate = "";
    };
    //function for clearing all the input field

    $scope.removeAll = function () {
      $scope.ninjas = [];
    };

    //using JSON and $http to fetch and display data
    $http.get("data/ninjas.json").then(function (response) {
      $scope.ninjas = response.data;
      console.log(response.data);
    });
  },
]);

//creating a ontroller for the contact page
app.controller("contactController", [
  "$scope",
  "$location",
  function ($scope, $location) {
    $scope.sendMessage = function () {
      $location.path("/thanks");
    };
  },
]);

//my first custom directive
app.directive("randomNinja", [
  function () {
    return {
      restrict: "E",
      scope: {
        ninjas: "=",
        title: "=",
      },
      templateUrl: "views/random.html",
      transclude: true,
      replace: true,
      controller: function ($scope) {
        $scope.random = Math.floor(Math.random() * 4);
      },
    };
  },
]);
