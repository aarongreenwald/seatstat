from pyramid.config import Configurator
from sqlalchemy import engine_from_config

from api import models

def main(global_config, **settings):
        
    config = Configurator(settings=settings)
    config.include('pyramid_chameleon')        
    
    engine = engine_from_config(settings, 'sqlalchemy.')    
    api.models.DBSession.configure(bind=engine)
    api.models.Base.metadata.bind = engine
        
    #for the main entry point to the SPA
    config.add_route('app', '/app') 
    #pages that aren't part of the spa are rendered server side, 
    #mostly for SEO purposes
    config.add_route('about', '/about') 
    config.add_route('home', '/') 
    
    #api routes
    config.add_route('groups', '/api/groups')    

    #this sets up the ui folder to be served from the root, so things like /common/...js work    
    config.add_static_view('', 'ui', cache_max_age = 0) 
        
    config.scan()
    return config.make_wsgi_app()
