# Unit 2 Project - TravelTime?
## Overview
An app to tell the user what to pack when they're about to go to a different city, based on the upcoming weather. The database will store the user's saved pack lists.

## Wireframes
See 'website.drawio' and it's tabs (at the bottom of the file when opened) for the different webpages. NOTE: You must install a viewer, such as "Draw.io Integration" (as VS Code extension), to view this file.

## User Stories

## Database ERD
See 'Database ERD.jpg'

## Backend Routes:
 * GET '/' - Home page.
 * POST '/users' - Create user.
 * POST '/users/login' - Login an existing user.
 * GET '/users/history' - Retrieve a logged in user's saved packlists.
 * GET '/search' - Retrieve weather information and packlist items for the searched city.
    - Specifically, the following will be returned for use:
        + City
        + Country
        + Past 5 days' weather category
        + Today's (date search occured) weather category
        + Next 7 days' weather category
        + Packlist (list of items to pack)
 * POST '/search/save' - Save a searched packlist. NOTE: This only works immediately after a search has been performed.

## MVP Checklist
[] Analyze next 7 days' weather to return Frigid, Cold, Warm, or Hot.


## Stretch Goals
* Checkboxes for packing items.
    - Save status of checkboxes so user may log out and log back in and still have access to the same state of the checkboxes.
* 
## User Stories

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