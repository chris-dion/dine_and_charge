// global variables with nominal Austin lat/long for opencharge api call...google maps pin drop outputs to 6 decimal places
var lat = 30.287738;
var long = -97.729001;

//once the user click on the map the map will prevent any new ev station markers being created
var firstClick = false;

// API doesn't need a key, current settings: max results=10, distance searched=10, units=miles, export to JSON
  //JSON export file seems to output in order of distance from lat long
  var marker_array = [];
  var infoWindow_array = [];
//https://api.foursquare.com/v2/venues/search?client_id=G4IC4U00QBF1J4NAJZIMLHTIZC15IDUYDIAAN420YTSIR3WE&client_secret=OTMNQNDGDXD4TJMP5QB3FENUXIDRWR0YCZHWFQYLIDMIP25G&near=Austin,TX&query=sushi%20&v=20171128

function initMap() {
	//centers map around the texas area
  var myLatlng = {lat: 30.275, lng: -97.730};

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
  
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLatlng
  }); 

  google.maps.event.addListener(map, 'click', function(event) {
    if(firstClick === false){
        clearOverlays();
        // marker = new google.maps.Marker({position: event.latLng, map: map});
        console.log(event.latLng.lat());
        lat = event.latLng.lat();
        long = event.latLng.lng();
        // after lat long 

    var queryChargeURL = "https://api.openchargemap.io/v2/poi/?output=json&countrycode=US&maxresults=10&latitude="+lat+"&longitude="+long+"&distance=50&distanceunit=Miles";

        //create event to send lat long to opencharge API


        $.ajax({
          url: queryChargeURL,
          method:"GET"
        })
        .done(function(response){

          //Store ID in FireBase ?
          // var locationMap = response[0].ID;

          //  console.log(locationMap);


          for (i =0; i < response.length; i++){
            //create long an lat from the database
            var newLat = response[i].AddressInfo.Latitude;
            var newLong = response[i].AddressInfo.Longitude;
            let address = response[i].AddressInfo.AddressLine1;
            let cost = response[i].UsageCost;
            if (cost === null){
              cost = "N/A";
            }

            //display set for the google map windows, creates a var to use

           
              // Creates markers on the page and stores them in array
            let marker = new google.maps.Marker({position:{lat: newLat, lng: newLong  }, map: map});
               //post new lat and long to a marker
                  //div only being run
            let contentString = "<div><p> Address: "  +address+"</p><br><p> Fee: " +cost+"</p></div>";
            console.log(contentString);

            let setDisplay = new google.maps.InfoWindow({
              content: contentString
            });

            infoWindow_array [i] = setDisplay;

            marker.addListener( 'click', function(){
                clearWindows();
                setDisplay.open(map, marker);
                
                //builds local queryFoodURL variable for foursquare api call
                var foursquareClient = "G4IC4U00QBF1J4NAJZIMLHTIZC15IDUYDIAAN420YTSIR3WE";
                var foursquareSecret = "OTMNQNDGDXD4TJMP5QB3FENUXIDRWR0YCZHWFQYLIDMIP25G";
                var queryFoodURL = "https://api.foursquare.com/v2/venues/explore?&ll="+marker.position.lat()+","+marker.position.lng()+"&radius=1609&section=food&client_id="+foursquareClient+"&client_secret="+foursquareSecret+"&v=20171130";
                console.log(queryFoodURL);
                //ajax call for foursquare that console logs the name of a food place in groups[0]
                $.ajax({
                  url: queryFoodURL,
                  method:"GET"
                })
                .done(function(aresponse){
                  //how to get relevant info from foursquare json file
                  console.log("name: "+aresponse.response.groups[0].items[0].venue.name);
                  console.log("category: "+aresponse.response.groups[0].items[0].venue.categories[0].shortName);
                  console.log("lat: "+aresponse.response.groups[0].items[0].venue.location.lat);
                  console.log("lng: "+aresponse.response.groups[0].items[0].venue.location.lng);
                  //remove old markers
                  clearOverlays();
                  //remove old popup windows
                  clearWindows();
                  console.log()
                  // creates map flags for foursquare responses
                  for (var i=0;i<aresponse.response.groups[0].items.length;i++) {
                    //new scoped variables
                    var restName = aresponse.response.groups[0].items[i].venue.name;
                    var restCat = aresponse.response.groups[0].items[i].venue.categories[0].shortName;
                    var restLat = aresponse.response.groups[0].items[i].venue.location.lat;
                    var restLng = aresponse.response.groups[0].items[i].venue.location.lng;   
                    // create new set of markers
                    let marker = new google.maps.Marker({position:{lat: restLat, lng: restLng  }, map: map});
                     //post new lat and long to a marker
                        //div only being run
                    let contentString = "<div><p> Restaurant Name: "  +restName+"</p><br><p> Genre: " +restCat+"</p></div>";
                    console.log(contentString);

                    let setDisplay = new google.maps.InfoWindow({
                      content: contentString
                    });

                    infoWindow_array [i] = setDisplay;

                    }


                });

                // *uncoded* we need to take the aresponse json and pull our desired fields into an array

            });

            marker_array [i] = marker;
          }

                // make an api query to open charge to get ev station for 20 miles

              //display stations as markers on google maps
                // add listener for marker click 
                  //make api call for foursqure for rest. in the area
                    // show list on google maps 
            });

    //this is the closing of the if firstclick === false statement.
    }
});



function clearOverlays() {
  for (var i = 0; i < marker_array.length; i++ ) {
    marker_array[i].setMap(null);
  }
  marker_array.length = 0;
}

function clearWindows() {
  for (var i = 0; i < infoWindow_array.length; i++ ) {
    infoWindow_array[i].close();
  }
}



};


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