var count = 0
seatstat.home.factory('ssSeatingChartDnD', [function(){
   return new function(){
        var api = {
            source: null,
            destination: null
        }
        
        return api
    } 
}])

seatstat.home.directive('ssSeatingChart', ['ssSeatingChartDnD', 'class', function(ssSeatingChartDnD, $class){

    return {
        restrict: 'A',
        scope: {
            ssSeatingChart: '='
        },
        link: function(scope, element, attributes){
            var key = scope.ssSeatingChart.key
            var dragStart = function(event, b, c){                                
                ssSeatingChartDnD.source = this                                
            }
                                                   
            var dragEnd = function(event){                 
                if (ssSeatingChartDnD.source !== ssSeatingChartDnD.destination){ 
                    var sourceStudent = ssSeatingChartDnD.source.attributes['data-key'].value   
                    var destinationStudent = ssSeatingChartDnD.destination.attributes['data-key'].value
                    scope.$apply(function(){
                        var temp
                        for (var i in $class.seatingChart){
                            var table = $class.seatingChart[i]
                            for (var j in table){
                                if (table[j].name === sourceStudent){
                                    if (!temp){
                                        temp = table[j]
                                        table[j] = _.find(_.flatten($class.seatingChart), function(x) { return x.name === destinationStudent })
                                    }
                                    else {
                                        table[j] = temp
                                    }
                                    
                                } 
                                else if (table[j].name === destinationStudent){
                                    if (!temp){
                                        temp = table[j]
                                        table[j] = _.find(_.flatten($class.seatingChart), function(x) { return x.name === sourceStudent })
                                    }
                                    else {
                                        table[j] = temp
                                    }                                    
                                }
                            }
                        }
                        $class.validation.validateSeatingChart($class.seatingChart)    
                    })                
                    
                   // var temp = ssSeatingChartDnD.destination.innerHTML
                   // ssSeatingChartDnD.destination.innerHTML = ssSeatingChartDnD.source.innerHTML
                   // ssSeatingChartDnD.source.innerHTML = temp
                }                                
            }
                    
            var dragOver = function(event){                    
                ssSeatingChartDnD.destination = event.currentTarget                               
            }          
            element.attr('data-key', key)
            element.attr('draggable', 'true')                 
            element.bind('dragstart', dragStart)              
            element.bind('dragover', dragOver)                            
            element.bind('dragend', dragEnd)
           
                    
        }
    }

}])
