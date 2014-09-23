grouper.controller('HeaderCtrl', ['$scope', '$window', '$timeout', function($scope, $window, $timeout){
    $scope.header = new function(){
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
                //every time the message is changed, the user's previous 'Don't show this again'
                //selection is made irrelevant. This might be too aggressive, because I might want 
                //to tweak the message without substantive difference
                //Also, I should clear localStorage every now and then
                if ($window.localStorage['grouper.header.hideBanner.'  + utilities.hash(api.bannerMessage)] !== "true"){                                        
                    $timeout(function(){
                        api.showBannerMessage = true    
                    }, 1000)
                }
            }
        }
        
        var api = {
            showBannerMessage: false,
            bannerMessage: 'Welcome to grouper! This app is not ready for public consumption. ' + 
                'Both the layout and content are subject to change dramatically and without notice, ' +
                'and the accuracy of the results is not guaranteed. ' +
                'Please feel free to try it out and direct questions, comments, and feedback ' +
                'to aaron@aarongreenwald.com. Thanks.',
                
            hideBannerMessage: function(permanent){
                this.showBannerMessage = false
                if (permanent){
                    $window.localStorage['grouper.header.hideBanner.' + utilities.hash(this.bannerMessage)] = "true"
                }
            }
        }
        
        utilities.initialize()
        return api
            
    }
    
}])
