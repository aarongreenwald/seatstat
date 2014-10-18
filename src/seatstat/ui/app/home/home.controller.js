seatstat.home.controller('HomeCtrl', ['$scope', '$http', '$window', function($scope, $http, $window){
    $scope.home = new function(){
        var utilities = {
            generateGroups: function(){ 
                $http({method: 'GET', url: 'api/groups', params: {
                        members: _.reject(_.pluck(api.members, 'name'), function(member) { return !member }),
                        restrictions: _.reject(api.restrictions, function(pair) { return !pair[0] || !pair[1]}),
                        group_sizes: _.pluck(api.groupSizes, 'size')
                    }
                })
                .success(function(data){
                    api.groups = data                   
                })
                .finally(function(){
                    $window.localStorage.setItem('seatstat', angular.toJson({
                        members: api.members,
                        restrictions: api.restrictions,
                        group_sizes: api.groupSizes
                    }))    
                })
            }
        }
        
        var api = {          
            generateGroups: function(){                
                utilities.generateGroups()
                this.step = 3
            } ,
                       
            step: 0,
            members: [{name: ''}],
            restrictions: [],            
            groupSizes: [],
                        
            groupCountChanged: function(){
                var groupSizes = []
                for (var i = 0; i < api.groupCount; i++){
                    groupSizes.push({size: Math.floor(api.members.length / api.groupCount)})
                }
                api.groupSizes = groupSizes                
            },
            
            addToRestriction: function(member){    
                if (!api.validInRestriction(member)){
                    return
                }            
                if (this.restrictions.length > 0 && this.restrictions[this.restrictions.length - 1].length === 1){
                    this.restrictions[this.restrictions.length - 1].push(member.name)
                }
                else {
                    this.restrictions.push([member.name])
                }
            },
            
            removeRestriction: function(index){
                this.restrictions.splice(index, 1)
            },
            
            midPair: function(){
                return this.restrictions.length && this.restrictions[this.restrictions.length - 1].length < 2
            },
            
            validInRestriction: function(member){
                if (api.midPair()){                                    
                    for (var i in this.restrictions){
                        if (this.restrictions[i].indexOf(member.name) !== -1 &&
                            this.restrictions[i].indexOf(this.restrictions[this.restrictions.length - 1][0]) !== -1){
                            return false
                        }
                    }
                }
                return true
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
            },
            
            duplicateMember: function(member){
                return _.where(this.members, {name : member.name}).length > 1
            }
            
        }
             
        _.extend(api, JSON.parse($window.localStorage.getItem('seatstat')))
        return api
    }
}])
