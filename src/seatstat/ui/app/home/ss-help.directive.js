seatstat.home.directive('ssHelp', [function(){
    return {
        restrict: 'A',
        transclude: true,
        replace: false,
        template: '<span><span class="glyphicon glyphicon-ok"></span><span style="display:none;" ng-transclude></span></span>',
        link: function(scope, element, attributes){
            var icon = jQuery(element.children().children()[0])
            var help = jQuery(element.children().children()[1])
            icon.bind('click', function(){
                help.toggle()
            })
        }
    }
}])
