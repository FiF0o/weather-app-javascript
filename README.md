# weather-app-javascript
This is a weather app using  http://openweathermap.org/forecast5 API.
App available at: [ouezeur app](https://ouezeur-app.now.sh)

api response example when making a request with city qs: `curl http://api.openweathermap.org/data/2.5/forecast\?q\=london\&APPID\=<YOUR_TOKEN> | prettyjson`



## running the project
`npm run start`


## dev
`npm run dev` (opens on `PORT` :3010)


## deploying

### API KEY
API_KEY will store your API token in `process.env`.
Deploy with `now` using `now -e API_KEY=<YOUR_API_KEY>`

### encrypting you API key before deploying
Make sure you encrypt `<YOUR_API_KEY>`` before deploying:
`now secret add api_key <YOUR_API_KEY>`

### deploying
`now` will automatically run `install`, `build`, `start` when deploying which can be overriden by `now-build`, `now-start` scripts.

### custom domain name
`now alias <YOUR_MOST_RECENT_URL>` `YOUR_ALIAS`