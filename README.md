# TTDS Project Frontend
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Set up
Follow these steps to get started:
- Install [Node.js](https://nodejs.org/) (use v14.15.4)
- Run `node --version` to make sure it is installed
- Clone this directory using \
  `git clone https://github.com/Explore-the-world-of-music/ttds-frontend.git`
- Run `npm install` and wait until all packages are downloaded
- That's it, you're ready to go!

## Running the dev enviroment
In the project directory, you can run `npm start`

This commnand runs the app in the development mode. \
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Connecting to the backend
By default, the project is configured to send all API requests to [http://localhost:5000](http://localhost:5000), which is the default port for Flask applications. If you need to change it for whatever reason, you can do this in package.json file.

## Deployment
This repo is configured to automatically deploy the master branch to [https://ttds-frontend.vercel.app/](https://ttds-frontend.vercel.app/). At the moment, it does not forward any API requests to any server, but it can be changed once we have a backend server running. 

Note that by default a build will fail if the code contains any warnings (like unused imports). 

You can find all other deployments [here](https://github.com/Explore-the-world-of-music/ttds-frontend/deployments).