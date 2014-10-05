seatstat.controller('HeaderCtrl', ['$scope', '$window', '$timeout', function($scope, $window, $timeout){
    $scope.header = new function(){
        //every time the message is changed, the user's previous 'Don't show this again'
        //selection is made irrelevant by updating the bannerMessageId value.
        //Perhaps I can do it off of a hash of the content of the message, but that might be too aggressive.
        //Small changes shouldn't invalidate the user's selection
        //Also, I should clear localStorage every now and then
        var bannerMessageId = 1       
        
        var utilities = {
            hash: function(str){
    
                var hash = 0;                
                for (var i = 0; i < str.length; i++) {
                    var character  = str.charCodeAt(i)
                    hash  = ((hash<<5)-hash)+character
                    hash = hash & hash
                }
                return hash
            },
            initialize: function(){                
                if ($window.localStorage['seatstat.header.hideBanner.'  + bannerMessageId.toString()] !== "true"){                                        
                    $timeout(function(){
                        api.showBannerMessage = true    
                    }, 1000)
                }
            }
        }
        
        var api = {
            showBannerMessage: false,                            
            hideBannerMessage: function(permanent){
                this.showBannerMessage = false
                if (permanent){
                    $window.localStorage['seatstat.header.hideBanner.' + bannerMessageId.toString()] = "true"
                }
            }
        }
        
        utilities.initialize()
        return api
            
    }
    
}])
