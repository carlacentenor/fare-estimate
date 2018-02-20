var btnSearch = document.getElementById('btn-search');

var destiny = document.getElementById('destiny');

// Uber API Constants
var uberClientId = "PkplQl8B-mgnqu3YAQMw2BdN1A2IYQgA";
var uberServerToken = "klCbeqQcT-VTdF3jhDrolwlYMpamCpV_R0o9ziCW";
var maps = document.getElementById('map');
var destiny = document.getElementById('destiny');
// Create variables to store latitude and longitude
var userLatitude,
 userLongitude,
 partyLatitude = -12.12080,
partyLongitude = -77.02950;

navigator.geolocation.getCurrentPosition(function(position) {
  
  userLatitude = position.coords.latitude;
  userLongitude = position.coords.longitude;
// console.log(userLatitude , userLongitude);

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

  var geocoder = new google.maps.Geocoder();
  btnSearch.addEventListener('click', function(){
    geocodeAddress(geocoder, map);
    // console.log(destiny.value);
    console.log('hey');
  });
}

function initAutocomplete() {
  let autocompleteDestiny = new google.maps.places.Autocomplete(destiny);
}

function geocodeAddress(geocoder, resultsMap) {
  // var address = document.getElementById('address').value;
  var destinyValue = destiny.value;

  geocoder.geocode({'address': destinyValue}, function(results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      var longDestiny = results[0].geometry.bounds.f.f;
      var latDestiny = results[0].geometry.bounds.b.b + 0.03;
console.log(results[0].geometry.bounds.f.f);
console.log(results[0].geometry.bounds.b.b + 0.03);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
        
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
// function calculateAndDisplayRoute(directionsService, directionsDisplay) {
//   directionsService.route({
//     origin: origin.value,
//     destination: destiny.value,
//     travelMode: 'WALKING'
//   }, function(response, status) {
//     if (status === 'OK') {
//       directionsDisplay.setDirections(response);
//     } else {
//       window.alert('Ingrese direcciones correctas');
//     }
//   });
// }

// // calculate rout
//  directionsDisplay.setMap(map);
//   const onChangeHandler = ()=> {
//     calculateAndDisplayRoute(directionsService, directionsDisplay);
//   };
//   btnRoute.addEventListener('click', onChangeHandler);
// }