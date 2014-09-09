bling.home.controller('HomeCtrl', ['$scope', '$http', '$window', function($scope, $http, $window){
    $scope.home = new function(){
        var private = {
            generateGroups: function(){ 
                $http({method: 'GET', url: 'api/groups', params: {
                        members: _.reject(_.pluck(public.members, 'name'), function(member) { return !member }),
                        illegalPairs: _.reject(public.illegalPairs, function(pair) { return !pair[0] || !pair[1]}),
                        groupSize: public.groupSize             
                    }
                })
                .success(function(data){
                    public.groups = data
                    $window.localStorage.setItem('grouper', angular.toJson({
                        members: public.members,
                        illegalPairs: public.illegalPairs,
                        groupSize: public.groupSize
                    }))
                })
            }
        }
        
        var public = {          
            generateGroups: private.generateGroups,            
            
            members: [],
            illegalPairs: [],
            groupSize: 5,
            
            addMember: function(){
                this.members.push({name: ''} )
            },
            
            addIllegalPair: function(){
                this.illegalPairs.push([])
            }
            
        }
             
        _.extend(public, JSON.parse($window.localStorage.getItem('grouper')))
        return public
    }
}])
