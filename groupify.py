#quick and dirty experiment - if I can get this working properly,
#this project is viable. 

import math

#sample data - these would be parameters
members = range(0, 22)
group_size = 4
illegal_pairs = [[0, 1], [4, 5], [1, 5], [1, 7]]


member_count = len(members)
group_count = int(math.ceil(member_count / float(group_size)))

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
 
def group_is_legal(group):
    for pair in illegal_pairs:
        if pair[0] in group and pair[1] in group:
            return False
    return True
    
"""
def first_illegal_member(group):
    for pair in illegal_pairs:
        if pair[0] in group:
            return pair[1]
"""


def distribute_illegal_pairs():     
    for pair in illegal_pairs:         
        first = True
        second = True
        if pair[0] in members:
            first = safely_assign_group(pair[0])
        if pair[1] in members:
            second = safely_assign_group(pair[1])
        #todo: handle the failures   
        
def safely_assign_group(member):     
    i = 0   
    assigned = False
    while (not assigned) and (i < group_count):             
        group = groups[i]
        group += [member]   
        
        if len(group) > group_size or not group_is_legal(group):
            group.pop()            
            i += 1
        else:
            assigned = True  
            members.remove(member)               
            
    return i == group_count
    
    
def distribute_remaining_members():    
    for group in groups:
        while len(group) < group_size and len(members) > 0:
            group += [members[0]]
            members.pop(0)
       

#create the groups array
groups = []
for i in range(0, group_count):
    groups += [[]]
     
distribute_illegal_pairs()        
distribute_remaining_members()

print(illegal_pairs)
print(groups)
