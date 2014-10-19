seatstat.home.controller('ClassroomCtrl', ['$scope', 'class', function($scope, $class){
    $scope.home.classroom = new function(){
        var utilities = {
            initialize: function(){
                if ($class.tableSizes.length){
                    api.tableCount = $class.tableSizes.length
                }
            }
        }
        
        var api = {
             tableCountChange: function(){
                var tableSizes = []
                for (var i = 0; i < api.tableCount; i++){
                    tableSizes.push({size: Math.floor($class.students.length / api.tableCount)})
                }
                $class.tableSizes = tableSizes                
            }, 
                        
        }
        
        utilities.initialize()
        return api
    }
}])
