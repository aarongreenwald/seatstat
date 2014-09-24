grouper
==================

At its core, grouper is a tool for dividing a large group of items into groups of (roughly) the same size while 
honoring restrictions on which items can be in the same group with another. It is entirely non-functional and unstable.

Its primary implementation is for seating children around tables in a classroom, but can be used for dividing students 
into teams or really anything. (Although the front-end is built with seating students in mind, the back-end is application-agnostic.)


Getting Started
---------------

Clone this repository and cd to the ./grouper directory (relative to this file). Then:

- mkdir ../env
- virtualenv ../env
- ../env/bin/python setup.py develop
- ../env/bin/pserve development.ini

Have fun!

For production, you will need to add production.ini and set the port correctly.

(You may need to install some things along the way, like virtualenv. It should be self-explanatory, unless you're on a Windows system. Then I recommend switching operating systems or finding someone with more patience than I have.)
