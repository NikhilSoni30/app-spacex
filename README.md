# app-spacex

Build command:
"ng build --aot --prod"
Server start:
"node server.js:
Compiling Command:
"ng serve"

# Technology Stack:

- Used Tortoise Git to sync remote to orgin.
- The app is build on Angular 10 using TypeScript - HTML5 - CSS and IDE used: Visual Studio Code on Windows 10.
- Version control: Tortoise git - gitHub
- Deployment: Heroku

# The app has a header with app title, a side division with filters, a content block which cover most of the screen- it has the listed out data based on filters and a footer.

# Procedure followed to create the application: 
- Made sure that node is installed in system - Installed angular cli - made a new project using ng new -
- made html design using css flex properties and media query since bootstrap was not allowed to be used 
- created button css
- called first API call in ngoninit 
- made the cards of launches responsive 
- added binding of button events(Used ng model)
- added ng class to display active buttons
- wrote api calls in service and did dependency injection in app component for that service file
- subscribed and unsbscribed the calls
- when ready, code was moved to github repo
- made account on heroku to deploy the app
- connected the heroku with my github for auto deployment whenever code is pushed in github
- deployment configuration done in project by adding server.js and changed script values in package.json
- pushed one file to github and app was deployed at: http://app-spacex-n.herokuapp.com/
