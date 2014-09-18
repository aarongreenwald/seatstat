from pyramid.config import Configurator

import api.models

def main(global_config, **settings):
    
    config = Configurator(settings=settings)
    config.include('pyramid_chameleon')        
        
     #for the main entry point to the SPA
    config.add_route('app', '/') 
        
    config.add_route('groups', '/api/groups')    

    #this sets up the ui folder to be served from the root, so things like /common/...js work    
    config.add_static_view('', 'ui', cache_max_age = 0) 
        
    config.scan()
    return config.make_wsgi_app()
