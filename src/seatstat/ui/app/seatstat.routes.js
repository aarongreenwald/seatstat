seatstat.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/students");

  $stateProvider
    .state('header', {
      url: "/",
      templateUrl: "app/header/header.html",
      abstract: true
    })
    .state('header.students', {
      url: "students",
      templateUrl: "app/home/students.html"
    })
    .state('header.classroom', {
      url: "classroom",
      templateUrl: "app/home/classroom.html"
    })
    .state('header.restrictions', {
      url: "restrictions",
      templateUrl: "app/home/restrictions.html"
    })
    .state('header.seating-chart', {
      url: "seating-chart",
      templateUrl: "app/home/seating-chart.html"
    })
})
