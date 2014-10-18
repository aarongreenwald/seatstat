from pyramid.events import NewRequest
from pyramid.events import subscriber
from ..api.models import UserAccess, DBSession
import transaction

@subscriber(NewRequest)
def log_user_access(event):
    request = event.request
    #don't log paths that are css, js, or otf. These are redundant
    if (request.path[-4:] != '.css' 
            and request.path[-3:] != '.js'
            and request.path[-4:] != '.otf'):
        user_access = UserAccess(request.client_addr, request.method, request.path, request.query_string, request.body) #client_addr?
        user_access.csvlog() #remove this once the db is set up
        #DBSession.add(user_access)
        #transaction.commit()
        
#TODO        
def log_event(event):
    if isinstance(event, Exception):
        print('Error', event)
