var btnSearch = document.getElementById('btn-search');
var destiny = document.getElementById('destiny');
var panel = $('.panel-prices');
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
      end_latitude: localStorage.lat,
      end_longitude: localStorage.long
    },
    success: function (result) {
     result.prices.forEach(function(element){
       
       let template;
       template = `<div class="row prices-element">
       <div class="col-6"><p>${element.localized_display_name}</p></div>
       <div class="col-6"><p>${element.estimate}</p></div>
       </div>`;


       panel.prepend(template);
     })
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

  btnSearch.addEventListener('click', function () {
    $('.prices-element').remove();
    geocodeAddress(geocoder, map);
    navigator.geolocation.getCurrentPosition(function (position) {

      userLatitude = position.coords.latitude;
      userLongitude = position.coords.longitude;

      getEstimatesForUserLocation(userLatitude, userLongitude);
    });


  });

}

function initAutocomplete() {
  let autocompleteDestiny = new google.maps.places.Autocomplete(destiny);
}




function geocodeAddress(geocoder, resultsMap) {
  var address = destiny.value;

  geocoder.geocode({
    'address': address
  }, function (results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);

      long = results[0].geometry.location.lng();
      lat = results[0].geometry.location.lat();

      localStorage.long = long;
      localStorage.lat = lat;


      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location

      });

    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }


  });

}














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