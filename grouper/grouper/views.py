from pyramid.renderers import get_renderer
from pyramid.view import view_config

def layout():
    renderer = get_renderer("ui/common/layout.pt")
    layout = renderer.implementation().macros['layout']
    return layout


@view_config(renderer="ui/seatstat.pt", route_name="app")
def index_view(request):
    return {"layout": layout(),
            "page_title": "SeatStat"}


@view_config(renderer="ui/about.pt", route_name="about")
def about_view(request):
    return {"layout": layout(),
            "page_title": "About Grouper"}

