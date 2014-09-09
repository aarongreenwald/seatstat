from pyramid.response import Response
from pyramid.view import view_config
from pyramid.view import forbidden_view_config
from pyramid.view import notfound_view_config
from member_set import *
from member import *

import json

import pyramid

from .models import (
    DBSession 
    )


def format(obj):    
    if isinstance(obj, datetime.date):
        return str(obj)
    elif isinstance(obj, numbers.Number):
        return str(obj) 
    else:
        return obj

def serialize(result_set):          
    if not isinstance(result_set, list):        
        result = {c.name: format(getattr(result_set, c.name)) for c in result_set.__table__.columns}
    else:
        result = []
        for row in result_set:          
            serialized = {c.name: format(getattr(row, c.name)) for c in row.__table__.columns}
            result.append(serialized)
    return result

@view_config(route_name='groups', renderer='json') #using the json renderer double escapes the strings
def groups(request):    
        
    names = request.params.getall('members')    
    group_size = int(request.params['groupSize'])

    members = []    
    for i in range(0, len(names)):
        members += [Member(names[i])]

    illegal_pairs_names = request.params.getall('illegalPairs')
    
    illegal_pairs = []
    for pair_str in illegal_pairs_names:        
        pair = json.loads(pair_str)               
        illegal_pairs += [[Member(pair[0]), Member(pair[1])]]
        
    member_set = MemberSet(members, group_size, illegal_pairs)    
    return member_set.groupify()   
    
