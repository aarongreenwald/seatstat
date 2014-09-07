from pyramid.response import Response
from pyramid.view import view_config
from pyramid.view import forbidden_view_config
from pyramid.view import notfound_view_config
from member_set import *
from member import *

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

@view_config(route_name='groups', renderer='json')
def groups(request):    
    
    names = request.params.getall('members')
    group_size = int(request.params['groupSize'])

    members = []    
    for i in range(0, len(names)):
        members += [Member(names[i])]

    illegal_pairs = [
                [members[0], members[2]],
                [members[3], members[4]],
                [members[6], members[7]],
                [members[12], members[7]],           
                [members[8], members[9]],
                [members[10], members[9]],
                [members[11], members[21]],
                [members[12], members[11]],
                [members[14], members[13]],
                [members[16], members[17]],
            ]

    illegal_pairs = []
    member_set = MemberSet(members, group_size, illegal_pairs)
    return member_set.groupify()   
    
