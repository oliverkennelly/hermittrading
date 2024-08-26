# Hermit Trading
Hermit Trading is a javascript/react and python/django project made for my 2024 Nashville Software School server side course. It features a simple trading game to demonstate my abilities in managing data, offering support for multiple users.
## Prerequisites
-Node.js 18.17
-npm
-python3 3.9
-pipenv
-VS Code (or an application like it)
## Usage
Clone the repository from GitHub
## Server side setup
1. Navigate to the hermitapi directory in your terminal
2. Run `pipenv shell` for the virtual enviroment
3. Run `pipenv install`
4. Run `python3 manage.py mirgrate` to create the django tables
5. Run `./seed_data.sh` for seeded data
6. Open the project in VS Code
7. Open the Command Pallette and select "Python: Select Interpreter" (to open, press ⌘SHIFTP (Mac), or CtrlSHIFTP (Windows))
8. Search for "hermitapi" and select the interpreter that starts with those characters
9. Start the debugger and verify the process starts with no exceptions

## Client side setup
1. Navigate to the hermitclient directory in a seperate terminal window
2. Run `npm install`
3. Run `npm run dev`
4. Navigate to the link at `Local:`
5. Login with email `emily@lemmon.com` and password `lemmon`
(Note: if any other user is desired for use, the emails can be found in the database, and all passwords are the user's last name.)

## Credits

Character art by me

Pixel art by me and sourced from minecraft texture packs

Map art by mattabouttown
