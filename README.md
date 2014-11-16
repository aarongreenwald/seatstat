SeatStat
==================
SeatStat is a web-app designed to help teachers assign seats in classrooms where students sit around tables.

The production app can be accessed at http://www.seatstat.com. Technical issues can be reported on GitHub,
all other feedback should be submitted via http://seatstat.uservoice.com.

Architecture
---------------
At its core, SeatStat is a tool for dividing a large group of items into groups of (roughly) the same size while 
honoring restrictions on which items can be in the same group with another. 
An attempt is being made to keep the backend implementation-agnostic, while the front-end is focused on teachers 
seating children around tables in a classroom.

- Backend: Python (Pyramid)
- Frontend: AngularJS


Getting Started
---------------

Clone this repository and cd to the ./seatstat directory (relative to this file). Then:

- mkdir ../env
- virtualenv ../env
- ../env/bin/python setup.py develop
- Create development.ini (see sample.ini for an example) and set the database connection and port correctly.
- ../env/bin/pserve development.ini

Have fun!

For production, you will need to also add a file named production.ini and set the settings there correctly.

(You may need to install some things along the way, like virtualenv. It should be self-explanatory, perhaps with the help of Google.)

License
---------------
Copyright 2014, Aaron Greenwald. All Rights Reserved.
