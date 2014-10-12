from pyramid.renderers import get_renderer
from pyramid.response import Response
from pyramid.view import view_config
from pyramid.view import forbidden_view_config
from pyramid.view import notfound_view_config
from infrastructure import logging
from infrastructure.grouper_exception import GrouperException

def layout():
    renderer = get_renderer("ui/common/layout.pt")
    layout = renderer.implementation().macros['layout']
    return layout

@view_config(renderer="ui/app/seatstat.pt", route_name="app")
def app_view(request):    
    return {"layout": layout(),
            "page_title": "SeatStat"}


@view_config(renderer="ui/about.pt", route_name="about")
def about_view(request):
    return {"layout": layout(),
            "page_title": "About SeatStat"}

@view_config(renderer="ui/home.pt", route_name="home")
def home_view(request):
    return {"layout": layout(),
            "page_title": "SeatStat"}

@view_config(context=Exception)
def error_view(exception, request):        
    message = str(exception) if isinstance(exception, GrouperException) else 'An error occurred.'
    logging.log_event(exception)
    #TODO - check if this is an ajax request or not. If it is not, 
    #return an error view
    return Response(message, 500)
