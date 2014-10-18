from pyramid.response import Response
from pyramid.view import view_config
from pyramid.view import forbidden_view_config
from pyramid.view import notfound_view_config
from member_set import *
from member import *

import json
import pyramid

@view_config(route_name='groups', renderer='json') #using the json renderer double escapes the strings
def groups(request):    
        
    names = request.params.getall('members')    
    group_sizes = request.params.getall('group_sizes')    

    members = []    
    for i in range(0, len(names)):
        members += [Member(names[i])]

    groups = []
    for i in range(0, len(group_sizes)):
        groups += [int(group_sizes[i])]
            
    restriction_names = request.params.getall('restrictions')
        
    restrictions = []
    for restriction_str in restriction_names:        
        restriction = json.loads(restriction_str)               
        restrictions += [[Member(restriction[0]), Member(restriction[1])]]
     
    member_set = MemberSet(members, groups, restrictions)    
   
    return member_set.groupify()   
