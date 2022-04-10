from django.test import TestCase


class FooTest(TestCase):
    def test_foo(self):
        self.assertEqual(True, True)