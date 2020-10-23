## Installation
### Requirements
- Node.js >= 10

Just install the depedencies and you ready to go.

```bash
npm install
```


## Development
There's no transpilation process, we code it using commonjs / vanilla, just execute dev script to run in watch mode.

```bash
npm run dev
```

## Project Structure
### Folders & Files
- data

  contains static files html and json, html for the web and json for mobile app.

- public

  contains assets, we can put images / videos / fonts in here

- index.js

  all logic lives in here, routing and http handler.

### Routes
- POST `/graphql/v1`

handling request for graphql v1, some of pages need this endpoint but in practice we don't expect any hit. it is exist just for safety purpose

- POST `/graphql/v2`

dynamic-content request come to this path, it always return json file that located in `data/graphql.json` that contains instruction for mobile app to render ui for certain slug/page. in practice we just use it to render the landing page because the other page handled in web.

- GET `/(android/ios)/prefetch`

it returns static prefetch data, our app has prefetch mechanism where we start the request of initial data as soon as possible even before the js engine up. it happen in java world. if the request aren't finished after js engine up then js also requesting this endpoint and race againts it. so if we modify data in `data/graphql.json` we have to do also in `data/prefetch.json`

- GET `/android/v2/updateInfo` or `/ios/updateinfo`

this endpoint telling our mobile app if there's any bundle update that need to be downloaded, we always return error 500 for this that means no bundle update.

- GET `/faq`

returns faq.html

- GET `*`

returns index.html

## Widget Types

## Deployment
