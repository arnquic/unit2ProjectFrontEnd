# Unit 2 Project - TravelTime?
## Overview
An app to tell the user what to pack when they're about to go to a different city, based on the upcoming weather. The database will store the user's saved pack lists.

## Wireframes
See 'website.drawio' and it's tabs (at the bottom of the file when opened) for the different webpages. NOTE: You must install a viewer, such as "Draw.io Integration" (as VS Code extension), to view this file.

## User Stories
MVP user stories
* When I navigate to the website, I can click a button to sign up or login.
* When I click the signup button, I enter in a username and password to create a profile.
* When I have logged in, I see a form to search for a city from a country.
* When I search for a city, I'm shown the following results: the city I searched, today's temperature category, a five-day history, a seven-day forecast, and suggestions for which clothes to pack on a trip there (i.e. 'the packlist').
* When I look at the search results, I have the ability to clear or save the city and packlist.
* When I click on the history link, I am shown previous cities I have searched for and saved and the corresponding packlist.
* When I'm on any page, I am able to log out via a button on the navigation bar.

Stretch Goal user stories
* When I log in, my login data is transmitted securely (i.e. with encryption and hashing).
* When I look at my saved searches, I have the ability to update the packlist according to new search results performed today.
* When I look at my suggested packlist, I can add personal items to specific packItem categories (e.g shoes > 'Nike shoes', jackets > 'blue down jacket').
* When I search for a city, the background of the page changes according to the country or region the city is in.

## Database ERD
See 'Database ERD.jpg'

## Backend Routes:
 * POST '/users' - Create user.
 * POST '/users/login' - Login an existing user.
 * GET '/users/history' - Retrieve a logged in user's saved packlists.
 * GET '/users/search' - Retrieve weather information and packlist items for the searched city. NOTE: This only works if a user is logged in.
    - Specifically, the following will be returned for use:
        + City
        + Country
        + Past 5 days' weather category
        + Today's (date search occured) weather category
        + Next 7 days' weather category
        + Packlist (list of items to pack)
 * POST '/users/search/save' - Save a searched packlist. NOTE: This only works immediately after a search has been performed.
 * DELETE '/users/history' - Delete a saved packlist.

## MVP Checklist
* Frontend - HTML & CSS (Art)
    - []The main part I will need will be the navigation bar. I'm going to create the buttons that will show and hide whenever pressed I will use onclick functions in order for this to work and create seperate functions to hide and show certain buttons.
    - []Style the page so the website matches to any size screen. using margin or flex grid.
    - []Install font to make the page more appealing with script src
    - []I will use some javascript inorder to create a history of things saved in the search so the user can add and see in the history page what they searched for. This can be done with add innerHTML to behind a specific tag
    - []The homepage will welcome the user showing their name. This will be done with innerHTML in javascript to check if the username and display it on the homepage
    - [] Create a label showing the results of the search. I will do as much css as I can within the label to make the history look neat. possibly will need flex commands in order for this to work if not. I'll just create the list too look as neat as possible with in the label.
    - [] The search results would need to match data in the data base to be used. This will mostly be involved with the backend
    - [] this might be a stretch goal but it is doable. The background of the homepage will be transitioning in different countries. I believe set timers will be used for this and an array of images to cycle through
* Frontend - JS (Cullen)
    - [x] add eventListeners on navigation bar for signing up, logging in, logging out, and showing profile/user histoy, and home button. 
    - [] add eventListeners on sign up and login pages
    - [] add eventListeners on the search form
    - [] add eventListeners for saving and clearing search results
    - [] implement axios routing for sign up, login, and profile
* Backend - JS (Jake)
    - [x] Initialize Node
    - [x] Install pg, sequelize, express, rowdy-logger, axios
    - [x] Initialize Sequelize
    - [x] Edit config
    - [x] Add .gitignore
    - [x] Sequelize create db
    - [x] Sequelize create migrations
        + [x] Remember to include unique to the username attribute/table column
        + [x] The username and password table columns in the users table do not allow nulls.
    - [x] Sequelize execute migrations
    - [x] Confirm SQL database and tables
    - [x] Associate the models
    - [x] Add Routers and Controllers
    - [x] Create routes (See 'Backend Routes') 
    - [ ] Create controller functions (See 'Backend Routes')
        + [x] Add weather API call functionality.
        + [x] Analyze the weather of a groups of days (5days prior, today, or next 7 days) and return Frigid, Cold, Warm, or Hot for that group.
        + [x] User weather analysis to determine which packItems to include in the search's packList.

## Stretch Goals
* When I search for a city, the background of the page changes according to the country or region the city is in.
* Add encryption to the userId.
* Add hashing to the user password.
* Ability to update a saved search with the current weather forecast.
* Checkboxes for packing items.
    - Save status of checkboxes so user may log out and log back in and still have access to the same state of the checkboxes.
* Ability to add your personal clothes (a database table that is a closet) and say what weather they are meant for.
    - Your packlist will show your personal items as option for your packlist (e.g shoes > 'Nike shoes', jackets > 'blue down jacket').
* Country drop-down in search dynamically populates based on the city entered.

## Possible Names
* TravelTime

## Reference info:
* Two Repos:
    - Frontend: https://git.generalassemb.ly/arnquist010/unit2ProjectFrontEnd
    - Backend: https://git.generalassemb.ly/arnquist010/unit2ProjectBackend
* Collaborators:
    - Cullen: ct-redd
    - Art: rtcx2
    - Jake: arnquist010
* Command to create a branch: `git checkout -b your-name-branch`
* Command to switch to a branch: `git checkout your-branch-name`
* When ready to commit to the main branch:
    - First run `git pull` to pull into your local machine any changes your teammates have pushed to github.com.
    - Then run `git push`.