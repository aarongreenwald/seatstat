import unittest
from pyramid import testing
from ..api.member import *

class MemberTest(unittest.TestCase):
    
    def test_member(self):       
        member = Member('Name')        
        self.assertEqual(member.placement_valid, True) #initializes to valid
        self.assertEqual(member.__json__({}), { 'name': 'Name', 'placementValid': True })
        member.placement_valid = False
        self.assertEqual(member.__json__({}), { 'name': 'Name', 'placementValid': False })                
        self.assertEqual(str(member), 'Name')
     
