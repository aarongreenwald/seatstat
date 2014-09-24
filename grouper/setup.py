import os

from setuptools import setup, find_packages

here = os.path.abspath(os.path.dirname(__file__))
with open(os.path.join(here, 'README.txt')) as f:
    README = f.read()

requires = [
    'pyramid',
    'pyramid_chameleon',
    'pyramid_debugtoolbar',
    'pyramid_tm',
    'SQLAlchemy',
    'transaction',
    'zope.sqlalchemy',
    'waitress',
    'psycopg2',
    ]

setup(name='grouper',
      version='0.1',
      description='grouper is a web api for dividing groups of items into smaller groups while honoring constraints',
      long_description=README,
      classifiers=[
        "Programming Language :: Python",
        "Framework :: Pyramid",
        "Topic :: Web Application :: Web API",
        "Intended Audience :: School Teachers",
        ],
      author='Aaron Greenwald',
      author_email='aaron@aarongreenwald.com',
      url='www.aarongreenwald.com',      
      packages=find_packages(),
      include_package_data=True,
      zip_safe=False,
      test_suite='grouper',
      install_requires=requires,
      entry_points="""\
      [paste.app_factory]
      main = grouper:main
      """,
      )
