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
            var dragDropKey = scope.ssSeatingChart.dragDropKey
            
            var dragStart = function(event, b, c){                                
                ssSeatingChartDnD.source = this
                this.classList.add('ss-home-seating-chart-dragging')                                
            }
               
            var dragOver = function(event){                    
                this.classList.add('ss-home-seating-chart-dragging') 
            }  
            
            var dragEnter = function(event){
                ssSeatingChartDnD.destination = event.currentTarget                               
                
            }
            
            var dragLeave = function(event){
                this.classList.remove('ss-home-seating-chart-dragging') 
                //TODO - this is necessary but isn't working
                //without it, dragging over an element and then moving
                //to no element will still perform the swap
                //ssSeatingChartDnD.destination = null                               
                
            }
                                                   
            var dragEnd = function(event){                 
                if (ssSeatingChartDnD.destination && ssSeatingChartDnD.source !== ssSeatingChartDnD.destination){ 
                    var sourceStudent = ssSeatingChartDnD.source.attributes['data-dragdrop-key'].value   
                    var destinationStudent = ssSeatingChartDnD.destination.attributes['data-dragdrop-key'].value
                    scope.$apply(function(){
                        var temp //placeholder for the swap
                        for (var i in $class.seatingChart){
                            var table = $class.seatingChart[i]
                            for (var j in table){
                                //for both the source and the destination
                                //(because we don't know which we'll hit first)
                                //we need to check either place the item in temp
                                //and find the other item or just take the item out of temp
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
                        //reset the validation
                        $class.validation.validateSeatingChart($class.seatingChart)    
                    })                                    
                }                                
                ssSeatingChartDnD.source.classList.remove('ss-home-seating-chart-dragging')                
            }
                    
                  
            element.attr('data-dragdrop-key', dragDropKey)
            element.attr('draggable', 'true')                 
            element.bind('dragstart', dragStart)              
            element.bind('dragover', dragOver)                            
            element.bind('dragend', dragEnd)
            element.bind('dragenter', dragEnter)
            element.bind('dragleave', dragLeave)
           
                    
        }
    }

}])
