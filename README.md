# Geocoding Map
Basic application that let us to search for places and display address information.

### Technologies and libraries
- [Vue 3](https://vuejs.org/)
- [Express.js](https://expressjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Leaflet](https://leafletjs.com/SlavaUkraini/)
- [Mapbox Geocoding API](https://docs.mapbox.com/api/search/geocoding/)

### Set up

1. Visit [Mapbox](https://www.mapbox.com/) site, log in and add two access tokens: one for a client and one for a server
2. Clone a repo, install dependencies
3. Add ```.env``` file: both in the client and server folders
4. Fill in ```VUE_APP_API_KEY``` (client) and ```API_KEY``` (server) with values from Mapbox
5. Run client with ```yarn serve``` and run server with ```yarn dev``` (dev mode) or ```yarn start``` (prod mode)

App was deployed to [Heroku](https://heroku.com)

[DEMO](https://afternoon-badlands-71978.herokuapp.com/)
