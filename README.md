<h1>#URBAN SWEAT - FIND YOUR SPOT</h1>

<h2>WIP ReactJS project.</h2>

Company idea: <i> find the gym/workout spot that best fits you in whatever city you're in.</i>

Travel alot? Love to stay in shape? It sucks finding gyms in every new city you move to and it certainly isn't cool to pay full rates when staying for short stints.

Urban Sweat is the way forward - Pick your city, narrow by categories or just search gyms available in your city of choice and check out the facilities.

<h2>Tech jargon:</h2>
<h4>Frontend</h4>
<ul>
  <li>Built on ReactJS w/Redux state management</li>
  <li>Aphrodite inline styling + my own lightweight Flexbox system</li>
  <li>ES6 + 7</li>
</ul>
<h4>Backend</h4>
<ul>
  <li>Built on MongoDB w/Mongoose</li>
  <li>Express API</li>
  <li>NodeJS</li>
</ul>


<h3> TODO </h3>
<ul>
<li>Switch Promise chains for db calls to Promise.all <h3><-- DONE</h3></li>
<li>Consider converting all asyncActions to direct Promise returns instead of Promise.resolve(...)</li>
<li>Design Profile page and start layout code</li><h3><-- In Progress</h3>
<li>Design Map page for locating gyms by map</li><h3><-- In Progress</h3>
  <ul>
    <li>Flesh out aSync functions for map</li>
    <li>Grab gMaps api key and test</li><h3><-- DONE</h3>
  </ul>
  <li>Root.js not being used for Hot Realod ? REMOVE : keep </li>  
  <li>Refactor "HoverStateContainer" into HoC or just functional component</li>  
</ul>
