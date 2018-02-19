// Uber API Constants
var uberClientId = "PkplQl8B-mgnqu3YAQMw2BdN1A2IYQgA";
var uberServerToken = "klCbeqQcT-VTdF3jhDrolwlYMpamCpV_R0o9ziCW";
var maps = document.getElementById('map');
var destiny = document.getElementById('destiny');
// Create variables to store latitude and longitude
var userLatitude
, userLongitude
, partyLatitude = -12.12080
, partyLongitude = -77.02950;

navigator.geolocation.getCurrentPosition(function(position) {
  
  userLatitude = position.coords.latitude;
  userLongitude = position.coords.longitude;
console.log(userLatitude , userLongitude);

  getEstimatesForUserLocation(userLatitude, userLongitude);
});

function getEstimatesForUserLocation(latitude,longitude) {
  var proxy = 'https://cors-anywhere.herokuapp.com/';
  var apiUber = `https://api.uber.com/v1/estimates/price`;

$.ajax({
  url: proxy + apiUber,
  headers: {
      Authorization: "Token " + uberServerToken
  },
  data: {
    start_latitude: latitude,
    start_longitude: longitude,
    end_latitude: partyLatitude,
    end_longitude: partyLongitude
  },
  success: function(result) {
    console.log(result.prices);
  }
});
}

function initMap() {
  initAutocomplete();
  
  let pos = {
    lat: -12.020651498087096,
    lng: -76.93456887128904
  };
  let map = new google.maps.Map(maps, {
    zoom: 17,
    center: pos
  });
  let marker = new google.maps.Marker({
    position: pos,
    map: map,
  });
}

function initAutocomplete() {
  let autocompleteDestiny = new google.maps.places.Autocomplete(destiny);
}