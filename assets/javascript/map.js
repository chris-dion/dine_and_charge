// global variables with nominal Austin lat/long for opencharge api call...google maps pin drop outputs to 6 decimal places
var lat = 30.287738;
var long = -97.729001;
// API doesn't need a key, current settings: max results=10, distance searched=10, units=miles, export to JSON
	//JSON export file seems to output in order of distance from lat long
var queryURL = "https://api.openchargemap.io/v2/poi/?output=json&countrycode=US&maxresults=10&latitude="+lat+"&longitude="+long+"&distance=10&distanceunit=Miles&maxresults=10";

function initMap() {
	//centers map around the texas area
  var myLatlng = {lat: 30.275, lng: -97.730};

<<<<<<< HEAD
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAQfDZXPnxppD3_QVQrAlg-0NW5TwqXOHY",
    authDomain: "ut-drive-and-charge-project.firebaseapp.com",
    databaseURL: "https://ut-drive-and-charge-project.firebaseio.com",
    projectId: "ut-drive-and-charge-project",
    storageBucket: "ut-drive-and-charge-project.appspot.com",
    messagingSenderId: "231709144176"
  };
  firebase.initializeApp(config);
  
=======
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLatlng
  });

  google.maps.event.addListener(map, 'click', function(event) {
    marker = new google.maps.Marker({position: event.latLng, map: map});
    console.log(event.latLng.lat());
    lat = event.latLng.lat();
    long = event.latLng.lng();
  });
}


// // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyAQfDZXPnxppD3_QVQrAlg-0NW5TwqXOHY",
//     authDomain: "ut-drive-and-charge-project.firebaseapp.com",
//     databaseURL: "https://ut-drive-and-charge-project.firebaseio.com",
//     projectId: "ut-drive-and-charge-project",
//     storageBucket: "ut-drive-and-charge-project.appspot.com",
//     messagingSenderId: "231709144176"
//   };
//   firebase.initializeApp(config);
>>>>>>> integration
