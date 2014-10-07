var seatstat = angular.module('seatstat', [
    'ui.router',
    'seatstat.home'
    ])
     
seatstat.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('header', {
      url: "/",
      templateUrl: "header/header.html"      
    })
})

seatstat.home = angular.module('seatstat.home', [])
