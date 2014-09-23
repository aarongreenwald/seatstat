from pyramid.events import NewRequest
from pyramid.events import subscriber
from ..api.models import UserAccess, DBSession
import transaction

@subscriber(NewRequest)
def log_user_access(event):
    request = event.request
    user_access = UserAccess(request.method + ' - ' + request.url)
    print(user_access)
    DBSession.add(user_access)
    transaction.commit()
        
