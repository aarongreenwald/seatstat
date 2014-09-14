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
            generateGroups: function(){                
                private.generateGroups()
                this.step = 2
            } ,
                       
            step: 0,
            members: [],
            illegalPairs: [],
            groupSize: 5,
            
            evenDivision: function(){
                return (this.members.length  - 1) % this.groupSize === 0
            },
            
            addToIllegalPair: function(member){
                if (this.illegalPairs[this.illegalPairs.length - 1].length === 1){
                    this.illegalPairs[this.illegalPairs.length - 1].push(member.name)
                }
                else {
                    this.illegalPairs.push([member.name])
                }
            },
            
            removeIllegalPair: function(index){
                this.illegalPairs.splice(index, 1)
            },
            
            midPair: function(){
                return this.illegalPairs[this.illegalPairs.length - 1].length < 2
            },
            
            memberChange: function(index){
                var last = index === this.members.length - 1                
                if (this.members[index].name.trim() === ''){
                    if (index === this.members.length - 2){
                        this.members.pop()
                    }
                }else if (last){
                     this.members.push({name: ''} )
                }
            },
            
            memberBlur: function(index){
                if (this.members[index].name.trim() === '' && index !== this.members.length - 1){
                    this.members.splice(index, 1)
                }
            }
            
        }
             
        _.extend(public, JSON.parse($window.localStorage.getItem('grouper')))
        return public
    }
}])
