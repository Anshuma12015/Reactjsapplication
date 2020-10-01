# Reactjsapplication

https://lh3.googleusercontent.com/-aYwH8US7ptI/X3Fo4H49luI/AAAAAAAAAxc/xapEFvsvDJMA1-0Sj12cpVREa-H2gxf8wCK8BGAsYHg/s0/2020-09-27.png
you can  visit the link to see the final  view of the Home page.

This  Reactjs Application uses  various npm modules like-
1.cross-fetch to communicate with the json-server and fetch data from it. json-server is the one ,we have set-up to provide the Back-End for pour Application.
2.react-animation-components and react-transition-components to add tranition and animation effects in our application
3.redux to manage and store the state of application and to provide Flux Architecture.
4.react-redux-form to have a controllled Feedback form  with validations and state storage for the user.
5.In the json-server folder, we have installed json-server npm module to set up the json-server which runs at the port number 3001.At the url-http://localhost:3001/
6.react-router to navigate among views.
7.react-redux for binding between React and Redux.
8.redux-thunk  to write action creators that return a function instead of an action.
9react-logger to log  information to the developer console .Helps debug.

To start the json-server ,you can just run the command json-server --watch db.json -p 3001 -d 2000
This command makes the json-server to keep watching if any modifications in the db.json file, so that we get the updated view, which has all the data required and the server is set up to rumn on port number 3001 with the delay of 2000 seconds.
