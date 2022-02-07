# Lynked for Bolt 2022

Web application linking entrepreneurs with potential investors. 
The app recommends projects to investors based on several interests, namely type of business, 
amount of funding needed, the funding stage, and the industry. 

## Demo

A demo of this project can be found [here](https://bolt-b9576.web.app/).

## Getting Setup
This project assumes that you already have `Node ^14.17.6` & `npm ^6.14.15`. If you do not, please download them from [the official website](https://nodejs.org/en/download/)
Here are a couple of steps that you can follow to quickly get started with the project.

1. Clone the repository: `git clone https://github.com/mike1572/bolt.git`
2. Install the project dependencies by running `npm install` inside the cloned directory
3. Run `npm start` to start your own local development environment! Alternatively, here are some more commands available:

| Commands        | Output
|-----------------|-------------------------------------------------------------------|
| `npm run build` | Creates a production-ready build of the project, ready for deployment |
| `npm update`    | Updates dependencies that require newer versions to keep functioning correctly|
| `serve -s`      | You *must* install serve (`npm install -g serve`) before running this command. This command makes the project accessible both locally and on your network, in the event that you want to test it on different devices or share it with your entourage.|

There are many more commands, which you can familiarise yourself with on the [Create a React App](https://create-react-app.dev/) website, or in [npm's](https://docs.npmjs.com/) documentation.


## News API Key
In order to use the News feature in this application, you need to generate your own api key [here](https://newsapi.org/). Once you have obtained your API key, `src/NewsApiKey.js` needs to be created and should only contain 1 line: `export const apiKey = "<key goes here>"`. Once that is done, restart the project and everything should work!

## Firebase Credentials
This project uses Firebase and you would need to add the config data to get set up. The file should be named `src/firebaseConfig.js' and contain the following: 
import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage'
import {getAuth} from 'firebase/auth';
const firebaseConfig = <'Your credentials go here'>;
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app) 

## License
This project or parts of its code are licensed under AGPLv3. Furthermore, npm libraries are subject to their own copyright.
