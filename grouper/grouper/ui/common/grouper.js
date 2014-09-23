var grouper = angular.module('grouper', [
    'ui.router',
    'grouper.home'
    ])
     
grouper.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('header', {
      url: "/",
      templateUrl: "header/header.html"      
    })
})

grouper.home = angular.module('grouper.home', [])
