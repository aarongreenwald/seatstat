seatstat.home.controller('ClassroomCtrl', ['$scope', 'class', function($scope, $class){
    $scope.home.classroom = new function(){
        var utilities = {
            initialize: function(){                
                api.tableCount = $class.tableSizes.length               
            }
        }
        
        var api = {
             tableCountChange: function(){
                var tableSizes = []                
                var studentsCount = $class.students.length - 1
                var studentsPerTable = Math.floor(studentsCount / api.tableCount)
                var overage = studentsCount - (studentsPerTable * api.tableCount)
                for (var i = 0; i < api.tableCount; i++){
                    tableSizes.push({size:   i < overage ? studentsPerTable + 1 : studentsPerTable})
                }
                $class.tableSizes = tableSizes                
            }, 
                        
        }
        
        utilities.initialize()
        return api
    }
}])
