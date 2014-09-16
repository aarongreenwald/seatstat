grouper README
==================

Getting Started
---------------

Clone this repository and cd to the directory containing this file. Then:

- mkdir ../env
- virtualenv ../env
- ../env/bin/python setup.py develop
- ../env/bin/initialize_grouper_db development.ini
- ../env/bin/pserve development.ini

Have fun!

For production, you will need to add production.ini and set the port correctly.

(You may need to install some things along the way, like virtualenv. It should be self-explanatory, unless you're on a Windows system. Then I recommend switching operating systems or finding someone with more patience than I have.)
