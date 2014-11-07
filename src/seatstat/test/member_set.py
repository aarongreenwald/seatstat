import unittest
from pyramid import testing
from ..api.member_set import *
from ..api.member import *

class MemberSetTest(unittest.TestCase):
    def test_group(self):       
        group = Group(5, ['boo'])   
        self.assertEqual(str(group), 'max_size: 5, members: [\'boo\']')
              
    def test_init(self):
        members = []
        for i in range(26):
            members += [Member('Member' + str(i))]
        
        group_sizes = [5, 5, 5, 5, 6]        
        restrictions = []
        member_set = MemberSet(members, group_sizes, restrictions)
        self.assertEqual(len(member_set.members), 26, 'There should be 26 items in the members array.')
        self.assertEqual(len(member_set.members), 26, 'There should be 26 items in the members array.')

    
