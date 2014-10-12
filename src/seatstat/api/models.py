from sqlalchemy import *
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import (
    scoped_session,
    sessionmaker,
    )
import csv    
import datetime
        
from zope.sqlalchemy import ZopeTransactionExtension

DBSession = scoped_session(sessionmaker(extension=ZopeTransactionExtension()))
Base = declarative_base()        

class UserAccess(Base):
    __tablename__ = 'user_access'
    
    user_access_id = Column('user_access_id', INTEGER(), primary_key=True, nullable=False)
    method = Column('method', TEXT(), nullable=False)
    url = Column('url', TEXT(), nullable=False)    
    user = Column('user', TEXT(), nullable=True)
    query_string = Column('query_string', TEXT(), nullable=True)
    body = Column('body', TEXT(), nullable=True)

    def __init__(self, user, method, url, query_string, body):
        self.method = method
        self.url = url
        self.user = user
        self.query_string = query_string
        self.body = body
        
    def __str__(self):
        return self.method + ' - ' + self.url

    def csvlog(self):        
        with open('user_access.csv', 'a') as f:
            log = csv.writer(f, delimiter=',')
            data = [[unicode(datetime.datetime.now()), self.user, self.method, self.url, self.query_string, self.body]]
            log.writerows(data)

