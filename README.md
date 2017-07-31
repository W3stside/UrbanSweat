# URBAN SWEAT - FIND YOUR SPOT 

*WIP React project.*

#### Company idea: <em>find the gym/workout spot that best fits you in whatever city you're in.</em>

Travel alot? Love to stay in shape? It sucks finding gyms in every new city you move to and it certainly isn't cool to pay full rates when staying for short stints.

Urban Sweat is the way forward - Pick your city, narrow by categories or just search gyms available in your city of choice and check out the facilities.

## Tech jargon:
#### Frontend

+ Built on ReactJS w/Redux state management
+ Aphrodite inline styling + my own lightweight Flexbox system
  + ES6 + 7
  
#### Backend

+ Built on MongoDB w/Mongoose
+ Express routing
+ NodeJS

### TODO

+ ~~Switch Promise chains for db calls to Promise.all~~
+ Consider converting all asyncActions to direct Promise returns instead of Promise.resolve(...)
+ Design Profile page and start layout code H5 In Progress
+ Design Map page for locating gyms by map H5 In Progress 
  + Flesh out aSync functions for map
  + ~~Grab gMaps api key and test~~
  
+ Root.js not being used for Hot Reload ? REMOVE : keep
+ Refactor "HoverStateContainer" into HoC or just functional component
