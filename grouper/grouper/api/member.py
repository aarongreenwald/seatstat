
class Member:
    
    def __init__(self, name):
        self.name = name
        
    def __str__(self):
        return self.name

    def __repr__(self):
        return self.name

    def __json__(self, request):
        return self.name
        
    def __eq__(self, other):
        return (isinstance(other, self.__class__) 
        and self.__dict__ == other.__dict__) or self.name == other        

