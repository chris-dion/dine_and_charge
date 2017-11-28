// global variables for opencharge api call...lat/long from google maps pin drop outputs to 6 decimal places
var lat = 30.287738;
var long = -97.729001;
// API doesn't need a key, current settings: max results=10, distance searched=10, units=miles, export to JSON
var queryURL = "https://api.openchargemap.io/v2/poi/?output=json&countrycode=US&maxresults=10&latitude="+lat+"&longitude="+long+"&distance=10&distanceunit=Miles&maxresults=10";