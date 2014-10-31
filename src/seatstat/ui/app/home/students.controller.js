seatstat.home.controller('StudentsCtrl', ['$scope', 'class', function($scope, $class){
   
   $scope.home.students = new function(){
       
       var utilities = {
           
       }
       
       var api = {
             
            studentChange: function(index){
                var last = index === $class.students.length - 1                
                if ($class.students[index].name.trim() === ''){
                    if (index === $class.students.length - 2){
                        $class.students.pop()
                    }
                }else if (last){
                     $class.students.push({name: ''} )
                }
            },
            
            studentBlur: function(index){
                if ($class.students[index].name.trim() === '' && index !== $class.students.length - 1){
                    $class.students.splice(index, 1)
                }
            },
            
            duplicateStudent: function(student){
                return _.where($class.students, {name : student.name}).length > 1
            },
            
            loadSampleData: function(){
                $class.initializeSample()
            }
       }
       
       return api
       
   }
    
}])
