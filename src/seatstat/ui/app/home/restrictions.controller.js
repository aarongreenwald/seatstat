seatstat.home.controller('RestrictionsCtrl', ['$scope', 'class', function($scope, $class){
    
    $scope.home.restrictions = new function(){
        
        var utilities = {
           
        }    
   
        var api = {
            addToRestriction: function(student){    
                if (!api.validInRestriction(student)){
                    return
                }            
                if ($class.restrictions.length > 0 && $class.restrictions[$class.restrictions.length - 1].length === 1){
                    $class.restrictions[$class.restrictions.length - 1].push(student.name)
                }
                else {
                    $class.restrictions.push([student.name])
                }
            },
            
            removeRestriction: function(index){
                $class.restrictions.splice(index, 1)
            },
            
            midPair: function(){
                return $class.restrictions.length && $class.restrictions[$class.restrictions.length - 1].length < 2
            },
            
            validInRestriction: function(student){
                if (api.midPair()){                                    
                    for (var i in $class.restrictions){
                        if ($class.restrictions[i].indexOf(student.name) !== -1 &&
                            $class.restrictions[i].indexOf($class.restrictions[$class.restrictions.length - 1][0]) !== -1){
                            return false
                        }
                    }
                }
                return true
            }
        }
   
        return api 
        
    }
}])
