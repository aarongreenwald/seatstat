from sqlalchemy import *
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import (
    scoped_session,
    sessionmaker,
    )
        
from zope.sqlalchemy import ZopeTransactionExtension

DBSession = scoped_session(sessionmaker(extension=ZopeTransactionExtension()))
Base = declarative_base()        

class UserAccess(Base):
    __tablename__ = 'user_access'
    
    user_access_id = Column('user_access_id', INTEGER(), primary_key=True, nullable=False)
    info = Column('info', TEXT(), nullable=True)

    def __init__(self, info):
        self.info = info
        
    def __str__(self):
        return self.info
