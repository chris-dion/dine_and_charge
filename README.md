# dine_and_charge
This project is made to help people with electric cars to find charging stations in a given area and show the user eateries near a selected charging station. 

technology we used:
HTML/CSS
Jquery
Javascript

Firebase: we saved the locations of charging sations that have a large amount of eateries near by so we can recommend them to other users when the website first launches in the browser.

Google Map API: We used Google Map as our main UI for this project. The API listens for click events of various types like clicking on markers and on a given location on the map to save the longitude and latitude to use for API request for Foursquare and Opencharge API


Foursquare API: We use Foursquare to pull near by eateries given a longitude and latitude and a radius of .5 miles. After this request is made we display each results onto the google map

Opencharge API: We use Opencharge to pull charging stations given a longitude and latitude and a radius of 2 miles. After the request is made we display each results onto the google map.

Link to our deployed website.
https://chris-dion.github.io/dine_and_charge/