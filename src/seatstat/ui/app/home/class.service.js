seatstat.home.factory('class', ['$window', function($window){
    return new function(){
        var utilities = {
            validateStudents: function(){
                if (api.students.length < 4){
                    return 'You must add at least three students for SeatStat to work properly.'
                }
                for (var i = 0; i < api.students.length - 2; i++){
                    if (_.where(api.students, {name : api.students[i].name}).length > 1){
                        return 'Each student\'s name must be unique. No two students can share exactly the same name.'
                    }
                }                
            },
            
            validateClassroom: function(){
                if (api.tableSizes.length < 2){
                    return 'You must have at least two tables in your classroom for SeatStat to work properly.'
                }
                if (_.reduce(api.tableSizes, function(memo, table){return memo + table.size}, 0) !== api.students.length - 1){
                    //TODO this is horribly worded
                    return 'The total number of students must match the sum of the number of students on each table.'
                }
            },
            
            validateRestrictions: function(){
                var students = _.pluck(api.students, 'name')
                for (var i = 0; i < api.restrictions.length; i++){
                    if (students.indexOf(api.restrictions[i][0]) === -1 || 
                        students.indexOf(api.restrictions[i][1]) === -1 && 
                        !!api.restrictions[i][1]){
                        return 'You have names listed in your restrictions section that are not in the students list.'
                    }
                }
            }
        }
        
        var api = {
            students: [{name: ''}],
            restrictions: [],            
            tableSizes: [],
            validation : {
                isValid: function(subset){
                    var validationFunctions = []                    
                    switch (subset){
                        case 'students':
                            validationFunctions.push(utilities.validateStudents)
                            break
                        case 'classroom':
                            validationFunctions.push(utilities.validateClassroom)
                            break
                        case 'restrictions':
                            validationFunctions.push(utilities.validateRestrictions)
                            break  
                        default:
                            validationFunctions.push(utilities.validateStudents)
                            validationFunctions.push(utilities.validateClassroom)
                            validationFunctions.push(utilities.validateRestrictions)  
                    }
                    var validationMessages = []
                    for (var i = 0; i < validationFunctions.length; i++){
                        var result = validationFunctions[i]()
                        if (result){                            
                            validationMessages.push(result)
                        }
                    }                    
                    this.messages = validationMessages
                    return validationMessages.length === 0
                },
                messages: []                            
            }
        }
        
        
        _.extend(api, JSON.parse($window.localStorage.getItem('seatstat')))
        return api
    }
}])
