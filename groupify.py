from member_set import *
from member import *

names = ['Liam', 'Olivia', 'Noah', 'Emma', 'Ethan', 'Sophia' ,'Mason' ,'Ava',               
            'Logan',    'Isabella',             
            'Lucas',    'Mia',              
            'Jacob',    'Charlotte',                
            'Jackson',  'Emily',                
            'Jack', 'Harper',               
            'Aiden',    'Abigail',              
            'Elijah',   'Avery']

members = []
for i in range(0, len(names)):
    members += [Member(names[i])]

illegal_pairs = [
            [members[0], members[2]],
            [members[3], members[4]],
            [members[6], members[7]],
            [members[12], members[7]],           
            [members[8], members[9]],
        ]

member_set = MemberSet(members, 4, illegal_pairs)
print(illegal_pairs)
print(member_set.groupify())
