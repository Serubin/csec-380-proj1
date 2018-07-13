import unittest
import endpoints


class tests(unittest.TestCase):

    def test_index(self):
        self.assertEqual(index(), 'You shouldn\'t be here')

    def test_userSearch(self):
        self.assertEqual(userSearch(), '')

    def test_followUser(self):
        self.assertEqual(followUser(), 'Not Authenticated')

    def test_unfollowUser(self):
        self.assertEqual(unfollowUser(), 'Not Authenticated')

if __name__ == '__main__':
    unittest.main()
