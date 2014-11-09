seatstat.home.factory('class', ['$window', function($window){
    return new function(){
        var utilities = {
            validateStudents: function(){
                //there's always a blank student. so if there's only one (blank) student,
                //show the "load sample data" message instead of a validation error
                if (api.students.length === 1){
                    return ''
                }                
                if (api.students.length > 1 && api.students.length < 4){
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
            },
       
            validateSeatingChart: function(seatingChart){
                //first reset everyone to valid because things may have change since last time 
                //this was run 
                seatingChart = _.map(seatingChart, function(table) {return _.map(table, function(student) { student.placementValid = true; return student }) })                
                for (var i = 0; i < api.restrictions.length; i++){                    
                    for (var j = 0; j < seatingChart.length; j++){
                        var first = _.where(seatingChart[j], {name :api.restrictions[i][0]}).length !== 0
                        var second = _.where(seatingChart[j], {name :api.restrictions[i][1]}).length !== 0
                        if (first !== second){
                            // this restriction is fine, 
                            //continue to next restriction                            
                            break
                        }
                        else if (first && second){                            
                            _.where(seatingChart[j], {name :api.restrictions[i][0]})[0].placementValid = false
                            _.where(seatingChart[j], {name :api.restrictions[i][1]})[0].placementValid = false                            
                            //these are invalid
                        }
                        //else they're both not on this table, continue to next table
                        //if it's the last table they'll certainly be invalid

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
                    var valid = true
                    for (var i = 0; i < validationFunctions.length; i++){
                        var result = validationFunctions[i]()
                        if (result != undefined){
                            valid = false
                            if (result != ''){ //an empty string result isn't valid but contains no message
                                validationMessages.push(result)
                            }
                        }                        
                    }                    
                    this.messages = validationMessages
                    return valid
                },
                messages: [] ,
                validateSeatingChart: utilities.validateSeatingChart                           
            },
            initializeSample: function(){
                this.students = [
                    {name: 'Alice' },
                    {name: 'Barry' },
                    {name: 'Charlie' },
                    {name: 'Denise' },
                    {name: 'Elsa' },
                    {name: 'Farah' },
                    {name: 'Greg' },
                    {name: 'Holly' },
                    {name: 'Ian' },
                    {name: 'Jess' },
                    {name: 'Kara' },
                    {name: 'Liam' },
                    {name: 'Mallory' },
                    {name: 'Neil' },
                    {name: 'Oscar' },
                    {name: 'Patricia' },
                    {name: 'Quentin' },
                    {name: 'Rob' },
                    {name: 'Sara' },
                    {name: 'Tina' },
                    {name: 'Ursula' },
                    {name: 'Veronica' },
                    {name: 'Walt' },
                    {name: 'Xavier' },
                    {name: 'Yuri' },
                    {name: 'Zoey' },
                    {name: '' }
                ]
                this.tableSizes = [{size: 5},{size: 5},{size: 5},{size: 5},{size: 6}]
                this.restrictions = [
                    ['Kara', 'Mallory'],
                    ['Kara', 'Zoey'],
                    ['Kara', 'Walt'],
                    ['Rob', 'Walt'],
                    ['Rob', 'Kara'],
                    ['Rob', 'Tina'],
                    ['Liam', 'Sara'],
                    ['Barry', 'Oscar']
                ]
            }
        }
        
        
        _.extend(api, JSON.parse($window.localStorage.getItem('seatstat')))
        return api
    }
}])
