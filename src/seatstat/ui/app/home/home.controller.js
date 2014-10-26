seatstat.home.controller('HomeCtrl', ['$scope', '$state', '$http', '$window', 'class', function($scope, $state, $http, $window, $class){
    
    $scope.class = $class
    
    $scope.home = new function(){
        var steps = ['students', 'classroom', 'restrictions', 'seating-chart']
        
        var utilities = {        
            currentStep: function(){
                return $state.$current.name.split('.')[$state.$current.name.split('.').length - 1]
            }
        }
        
        var api = {                                                    
            
            navigate: function(forward){                
                var current = steps.indexOf($state.$current.name.split('.')[$state.$current.name.split('.').length - 1])
                var destination = steps[current + (!!forward ? 1: -1)]
                $state.go($state.$current.parent.name + '.' + destination)
            },
                        
            lastStep: function(){
                return utilities.currentStep() === steps[steps.length - 1]
            },
            
            firstStep: function(){
                return utilities.currentStep() === steps[0]
            },
            
            startOver: function(){
                return $state.go($state.$current.parent.name + '.' + steps[0])
            },
            
            valid: function(){                
                return $class.validation.isValid(utilities.currentStep())                
            }
                            
        }
                    
        return api
    }
}])
