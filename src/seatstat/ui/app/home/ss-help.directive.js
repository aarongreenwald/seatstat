seatstat.home.directive('ssHelp', [function(){
    return {
        restrict: 'A',
        transclude: true,
        replace: false,
        templateUrl: 'app/home/ss-help.html',
        link: function(scope, element, attributes){
            var icon = jQuery(element.children().children('i'))
            var help = jQuery(element.children().children('div'))                        
            icon.bind('click', function(){
                help.toggle()                
            })
                        
        }
    }
}])
