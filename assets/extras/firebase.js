// here is the firebase code
// it is here so that group can look at it before applying it

// set the database
var database = firebase.database();
// var that get the information from location
// can take this with out being inside the related ajax call
var popularLocation = $("#station_address").val().trim();
// var popLocationLat=;
// var popLocationLong=;

// create a var to store infor
var storageInfo = {
	popularLocation: popularLocation 
	// popLocationLat:,
	// popLocationLong:
};
// pushing that information to the database
database.ref().push(storageInfo);

// creates a function to add the current informaiton from the station address to the mapSiderBar
database.ref().on("child_added", function(childSnapshot, prevChildKey){
	var dataBaseLocation = childSnapshot.val().popularLocation;
		// places the information in the sidebar 
	$("#mapSiderBar").append("<div><p>"+dataBaseLocation+"</p></div>");
});