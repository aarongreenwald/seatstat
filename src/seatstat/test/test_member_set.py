import unittest
from pyramid import testing
from ..api.member_set import *

class MemberSet(unittest.TestCase):
    def setUp(self):
        self.config = testing.setUp()

    def tearDown(self):
        testing.tearDown()
    
    def test_group_str(self): 		
	group = Group(5, ['boo'])   
        self.assertEqual(str(group), 'max_size: 5, members: [\'boo\']')
     
