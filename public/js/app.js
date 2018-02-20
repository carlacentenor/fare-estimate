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
  longDestiny,
  latDestiny;

navigator.geolocation.getCurrentPosition(function (position) {

  userLatitude = position.coords.latitude;
  userLongitude = position.coords.longitude;
  // console.log(userLatitude , userLongitude);

  // getEstimatesForUserLocation(userLatitude, userLongitude);
});

function getEstimatesForUserLocation(latitude, longitude) {
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
      end_latitude: lattDestiny,
      end_longitude: longgDentiny
    },
    success: function (result) {
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

  var destinyValue = destiny.value;
  var longgDentiny,
    lattDestiny;

  var geocoder = new google.maps.Geocoder();
  // geocodeAddress(geocoder, map);
  
}

function initAutocomplete() {
  let autocompleteDestiny = new google.maps.places.Autocomplete(destiny);
}

btnSearch.addEventListener('click', function () {
  function geocodeAddress(geocoder, resultsMap) {
    // var address = document.getElementById('address').value;

    geocoder.geocode({ 'address': destinyValue }, function (results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        longgDentiny = results[0].geometry.bounds.f.f;
        lattDestiny = results[0].geometry.bounds.b.b + 0.03;
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
          // return longDestiny;

        });
        console.log(longgDentiny, lattDestiny);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
      console.log(longgDentiny, lattDestiny);
      localStorage.destinyUbication = longgDentiny + ',' + lattDestiny;

    });
    console.log(longgDentiny, lattDestiny);
    console.log(localStorage.destinyUbication);
    // return (longgDentiny+','+lattDestiny);

  }
  // geocodeAddress(geocoder, map);
  console.log(userLatitude);
  getEstimatesForUserLocation(userLatitude, userLongitude);
});

// geocodeAddress(geocoder, resultsMap);
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