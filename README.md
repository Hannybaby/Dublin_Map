# Museum Map of Dublin

## Table of Contents

* [What's this?](#whats-this)
* [How to run](#how-to-run)
* [Dependencies](#dependencies)

## What's this?
 This is a web application where you can see museums located in the city of Dublin / Ireleand. You can filter available locations by typing in the form or click right on a entry. This will show an info window with the street address of the museum. Furthermore it is possible to show / hide the menue.  

 This application is accessable. 

## How to run 

To run this application on your machine: 

* Insert node_modules files in the root directory 
* Install NPM
* Open a terminal window and type npm start
* Open your browser and navigate to http://localhost:3000/

To run this App with a Service Worker:

* Create a production build with npm run build
* Type serve -s build
* Navigate to http://localhost:5000/

## Dependencies

This Project was bootstrapped with Create-React-App with a sevice worker included.

* React - a JavaScript library
* Google-Maps-React - a React Component
* Forsquare API - for fetching information about locations
* Google Maps API - for fetching the map of Dublin

