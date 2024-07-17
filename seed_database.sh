#!/bin/bash

rm db.sqlite3
rm -rf ./tradeapi/migrations
python3 manage.py migrate
python3 manage.py makemigrations tradeapi
python3 manage.py migrate tradeapi
python3 manage.py loaddata users
python3 manage.py loaddata tokens

