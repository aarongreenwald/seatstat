seatstat.home.factory('class', ['$window', function($window){
    return new function(){
        var utilities = {
            
        }
        
        var api = {
            students: [{name: ''}],
            restrictions: [],            
            tableSizes: []
        }
        
        
        _.extend(api, JSON.parse($window.localStorage.getItem('seatstat')))
        return api
    }
}])
