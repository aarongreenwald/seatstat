import math
from ..infrastructure import grouper_exception

class MemberSet:
    #todo: this class should not contain the grouping logic. it should 
    #just manage membersets (collections of members)
   
    def group_is_legal(self, group):
        for pair in self.restrictions:
            if pair[0] in group.members and pair[1] in group.members:
                return False                
        return True
        
    def distribute_restrictions(self):     
        for pair in self.restrictions:                     
            if pair[0] in self.members:
                self.safely_assign_group(pair[0])
            if pair[1] in self.members:
                self.safely_assign_group(pair[1])
            #it's possible that some of these fail to 
            #find a placement. in that case, they'll be 
            #handled when we distribute the remaining members and 
            #marked accordingly during the validation step
            
    def safely_assign_group(self, member):     
        i = 0   
        assigned = False
        while (not assigned) and (i < len(self.groups)):             
            group = self.groups[i]
            group.members += [member]   
            
            if len(group.members) > group.max_size or not self.group_is_legal(group):
                group.members.pop()            
                i += 1
            else:
                assigned = True  
                self.members.remove(member)                       
        #return whether or not the member was successfully placed
        return i == len(self.groups) 
        
        
    def distribute_remaining_members(self):    
        for group in self.groups:
            while len(group.members) < group.max_size and len(self.members) > 0:
                group.members += [self.members[0]]
                self.members.pop(0)
                
    def validate(self):        
        for pair in self.restrictions:
            for group in self.groups:                
                members = group.members
                first = pair[0] in members
                second = pair[1] in members
                if first != second:
                    break #this pair is good, the two are separated. 
                            #go to the next pair
                elif first and second:
                    members[members.index(pair[0])].placement_valid = False
                    members[members.index(pair[1])].placement_valid = False                    
                #else they're noth not in this group, check the other groups
           
    def groupify(self):
        self.distribute_restrictions()
        self.distribute_remaining_members()
        #we need to do another pass through of validation to 
        #because it's possible that we couldn't find a good solution
        #we'll mark the invalid placements   
        #TODO - perhaps unnecessary because we can do that client-side?
        self.validate()        
        return map((lambda x: x.members), self.groups)
        
    def __init__(self, members, group_sizes, restrictions):
        if len(group_sizes) < 2:
            raise grouper_exception.GrouperException('There must be at least two groups for grouping to work.')
            
        if len(members) < 3:
            raise grouper_exception.GrouperException('There must be at least three members for grouping to be meaningful.')
        
        if len(members) != reduce(lambda x, y: x + y, group_sizes):
            raise grouper_exception.GrouperException('The sum of group_sizes must be equal to the length of the members array.')        
        
         #TODO   
        #if group_size >= len(members):
        #    raise grouper_exception.GrouperException('The group size must be smaller than the total number of members for grouping to be meaningful.')
            
        self.members = members        
        self.restrictions = restrictions
        
        self.groups = []        
        for i in range(0, len(group_sizes)):
            max_size = group_sizes[i]
            members = []
            self.groups += [Group(max_size, members)]                
            
class Group:
    def __init__(self, max_size, members):
        self.max_size = max_size
        self.members = members       
        
    def __str__(self):
        return 'max_size: ' + str(self.max_size) + ', members: ' + str(self.members)
        
    def __json__(self, request):
        return str(self)
        
    def __repr__(self):
        return str(self)
        

