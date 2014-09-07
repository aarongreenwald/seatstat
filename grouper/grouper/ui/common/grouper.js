var bling = angular.module('grouper', [
    'ui.router',
    'grouper.home'
    ])
     
bling.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "home/home.html"      
    })
})

bling.home = angular.module('grouper.home', [])
