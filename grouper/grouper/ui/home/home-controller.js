bling.home.controller('HomeCtrl', ['$scope', '$http', function($scope, $http){
    $scope.home = new function(){
        var private = {
            generateGroups: function(){
                $http({method: 'GET', url: 'api/groups', data: {
                        members: public.members,
                        illegalPairs: public.illegalPairs,
                        groupSize: public.groupSize             
                    }
                })
            }
        }
        
        var public = {          
            generateGroups: private.generateGroups,            
            
            members: [{name: 'Tom'}, {name: 'Dick'}],
            illegalPairs: [],
            groupSize: 4,
            
            addMember: function(){
                this.members.push({name: ''} )
            }
        }
        
        return public
    }
}])
