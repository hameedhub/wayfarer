[![Build Status](https://travis-ci.org/hameedhub/wayfarer.svg?branch=develop)](https://travis-ci.org/hameedhub/wayfarer)  [![Coverage Status](https://coveralls.io/repos/github/hameedhub/wayfarer/badge.svg?branch=ch-coveralls-integration-167166230)](https://coveralls.io/github/hameedhub/wayfarer?branch=ch-coveralls-integration-167166230) 

# Wayfarer
> WayFarer is a public bus transportation booking server


## Installing / Getting started
Introduction on how to run the application.

> Clone the repo and cd into the file directory

```shell
npm install --To install all dependencies 
npm start   --To run the application
npm run dev -- To run in development mode
```

### Initial Configuration

Install Node JS which should come with a node package manager. It is the required environment for the application
Open the node command prompt or any of your favourite command tool and type ``` node --version``` to check if it installed
cd .. or change directory to the clone repo and type ``` npm install ```


## Developing

Procedure for further development of this application:

```shell
git clone https://github.com/hameedhub/wayfarer
cd into the wayfarer folder
cmd npm install
```
This install all the required dependencies for the project

### Built with

* Node Js - The web frame work
* npm - The package manager
* Mocha and Chai - Unit Testing

### Building

In additional, this application is written in ES6 which have some atypical syntax. Hence, may not run on some platform. Babel node, babel cli, babel-register and babel-preset-env should be installed to build the application to ES5

```shell
.start: babel-node app.js
npm start
```

RUN npm start on the clone repo, then babel builds it into later version, which can run in most platforms.

### Deploying / Publishing

In deploying this project to Heroku, install Heroku ci after you might signup. To check if it is properly install RUN ```heroku --version ``` to get the current version in use. To deploy RUN the following command prompt


```shell
$ heroku login i
$ heroku create <application name>
$ git remote -v 
$ git push heroku master 

```

```login i ``` enable you to login into heroku through the terminal interface, after providing the signup details, ```$heroku create with <application name>``` to create the application remote address linked with github then push to git push heroku

## API Endpoints

The application endpoints include:
- `POST https://hameed-wayfarer.herokuapp.com/auth/signup`
- `POST https://hameed-wayfarer.herokuapp.com/auth/signin`
- `POST https://hameed-wayfarer.herokuapp.com/bus`
- `POST https://hameed-wayfarer.herokuapp.com/trips`
- `GET  https://hameed-wayfarer.herokuapp.com/trips`
- `POST https://hameed-wayfarer.herokuapp.com/bookings`
- `GET  https://hameed-wayfarer.herokuapp.com/bookings`
- `PATCH https://hameed-wayfarer.herokuapp.com/trips/:tripId`
- `DELETE https://hameed-wayfarer.herokuapp.com/bookings/bookingId`


## Configuration / API Endpoints

API endpoint only allows json format and the expected output are also in json format.

### Create account
#### POST /auth/signup

Required fields :
first_ame: `String`  
last_ame: `'String`
email: `String`  
password: `'String`
is_admin: `'Boolean'`

On success response
```shell
{
    “status” : Integer ,
    “data” : {
    “id” : Integer , // id of newly created user
    “first_name” : String ,
    “last_name” : String ,
    “email” : String,
    “is_admin” : Boolean,
    }
    “token” : “45erkjherht45495783”
} 
```
Error response
```shell
{
    “status” : 400,404, 503, 509,
    “error” : “relevant-error-message”
} 
```

### Signin
#### POST /auth/signin

Required fields :
email: `String`  
password: `'String`

On success response
```shell
{
    “status” : Integer ,
    “data” : {
    “id” : Integer , // user id
    “first_name” : String ,
    “last_name” : String ,
    “email” : String 
    }
    “token” : “45erkjherht45495783”
}
```
Error response
```shell
{
    “status” : 400,404, 503,
    “error” : “relevant-error-message”
} 
```

### Create Trip
#### POST /trips

Required fields :
bus_id: `Integer`  
origin: `'String`
destination: `'String`
trip_date: `'String`
fare: `'Float`

On success response
```shell
{
  “status” : Integer ,
  “data” : {
  “id” : Integar ,
  }
}
```
Error response
```shell
{
    “status” : error status code ,
    “error” : “relevant-error-message”
} 
```



## Contributing

If you'd like to contribute, please fork the repository and make a feature
branch. I accept all forms of feedback. Thanks!

The code style guide is eslint airbnb

## Links


## Licensing

The code in this project is licensed under MIT license.

