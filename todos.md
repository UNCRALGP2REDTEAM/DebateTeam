UI Pages
-------------------
User Registration
Login
Main Page (Debate Directory)
Debate Pages
Profile (user info, points gained etc)
debate creation page



Front End JS
---------------------
Capture User Data
Send data in api routes
display info
search functions
sorting methods
delete functions


Auth
---------------------
protecting password on profile creation


Security
---------------------
add config.json & auth.js to gitignore


Routes
---------------------
Login - get user where username = input username

Main - get all pages (join with users for created by)

In Debate - delete comments, get page (where id = pageID) join on comments (where pageID = PageID & parent ID is null), join on comments where ParentID = Comment ID, Join on users (where user Id = user ID), create new Commetn, edit comment

Register - create new user

Profile - get all comments (where user ID = user ID), get all pages (where user ID = user ID), edit user info, delete posts