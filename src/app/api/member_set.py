import math
from ..infrastructure import grouper_exception

class MemberSet:
    #todo: this class should not contain the grouping logic. it should 
    #just manage membersets (collections of members)
    """
    def generate_groups():
        groups = [0] * group_count
        for group_index in range(0, group_count):
            group = [0] * group_size
            for member_index in range(0, group_size):
                group[member_index] = members[group_index * group_size + member_index]
            groups[group_index] = group
        return groups        

    """
     
    def group_is_legal(self, group):
        for pair in self.illegal_pairs:
            if pair[0] in group and pair[1] in group:
                return False
        return True
        
    """
    def first_illegal_member(group):
        for pair in illegal_pairs:
            if pair[0] in group:
                return pair[1]
    """

    def distribute_illegal_pairs(self):     
        for pair in self.illegal_pairs:         
            first = True
            second = True
            if pair[0] in self.members:
                first = self.safely_assign_group(pair[0])
            if pair[1] in self.members:
                second = self.safely_assign_group(pair[1])
            #todo: handle the failures   
            
    def safely_assign_group(self, member):     
        i = 0   
        assigned = False
        while (not assigned) and (i < self.group_count):             
            group = self.groups[i]
            group += [member]   
            
            if len(group) > self.group_size or not self.group_is_legal(group):
                group.pop()            
                i += 1
            else:
                assigned = True  
                self.members.remove(member)               
                
        return i == self.group_count
        
        
    def distribute_remaining_members(self):    
        for group in self.groups:
            while len(group) < self.group_size and len(self.members) > 0:
                group += [self.members[0]]
                self.members.pop(0)
           
    def groupify(self):
        self.distribute_illegal_pairs()
        self.distribute_remaining_members()
        return self.groups
        
    def __init__(self, members, group_size, illegal_pairs):
        if group_size < 2:
            raise grouper_exception.GrouperException('The group size must be at least two, or grouping is meaningless.')
            
        if len(members) < 3:
            raise grouper_exception.GrouperException('There must be at least three members for grouping to be meaningful.')
            
        if group_size >= len(members):
            raise grouper_exception.GrouperException('The group size must be smaller than the total number of members for grouping to be meaningful.')
            
        self.members = members
        self.group_size = group_size
        self.illegal_pairs = illegal_pairs        

        self.member_count = len(self.members)
        self.group_count = int(math.ceil(self.member_count / float(self.group_size)))
        #create the groups array
        self.groups = []
        
        for i in range(0, self.group_count):
            self.groups += [[]]
