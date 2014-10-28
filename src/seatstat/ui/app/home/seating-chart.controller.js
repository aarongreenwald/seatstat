seatstat.home.controller('SeatingChartCtrl', ['$scope', '$http', '$window', 'class', function($scope, $http, $window, $class){
    
        $scope.home.seatingChart = new function(){
            var utilities = {
                generate: function(randomize){                     
                    $http({method: 'GET', url: 'api/groups', params: {
                            members: _.reject(_.pluck($class.students, 'name'), function(student) { return !student }),
                            restrictions: _.reject($class.restrictions, function(pair) { return !pair[0] || !pair[1]}),
                            group_sizes: _.pluck($class.tableSizes, 'size'),
                            randomize: !!randomize
                        }
                    })
                    .success(function(data){
                        api.error = false
                        $class.seatingChart = data   
                        api.shuffled = randomize                
                    })
                    .error(function(error){
                        $class.seatingChart = null
                        api.error = true
                    })
                    .finally(function(){
                        $window.localStorage.setItem('seatstat', angular.toJson({
                            students: $class.students,
                            restrictions: $class.restrictions,
                            tableSizes: $class.tableSizes
                        }))    
                    })
                },
                
                initialize: function(){
                    this.generate(false)
                }
                
            }
            
            var api = {
                shuffle: function(){
                    utilities.generate(true)
                },
                print: function(){
                    $window.print()
                },
                generate: function(){
                    utilities.generate(false)
                },
                error: false
            }
            
            utilities.initialize()
            return api    
        }
            
}])
