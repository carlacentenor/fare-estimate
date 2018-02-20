var btnSearch = document.getElementById('btn-search');
var origin = document.getElementById('origin');
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



function getEstimatesForUserLocation() {
  var proxy = 'https://cors-anywhere.herokuapp.com/';
  var apiUber = `https://api.uber.com/v1/estimates/price`;

  $.ajax({
    url: proxy + apiUber,
    headers: {
      Authorization: "Token " + uberServerToken
    },
    data: {
      start_latitude: localStorage.latOrig,
      start_longitude: localStorage.longOrig,
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

  let directionsService = new google.maps.DirectionsService;
  let directionsDisplay = new google.maps.DirectionsRenderer;

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

  directionsDisplay.setMap(map);
  const onChangeHandler = ()=> {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };

  var destinyValue = destiny.value;
  var longgDentiny,
    lattDestiny;

  var geocoder = new google.maps.Geocoder();

  btnSearch.addEventListener('click', function () {
    onChangeHandler();
    $('.prices-element').remove();
    geocodeAddressOr(geocoder, map)
    geocodeAddress(geocoder, map);
   /* navigator.geolocation.getCurrentPosition(function (position) {

      userLatitude = position.coords.latitude;
      userLongitude = position.coords.longitude;

      
    });*/
    getEstimatesForUserLocation();

  });

}

function initAutocomplete() {
  let autocompleteOrigin = new google.maps.places.Autocomplete(origin);
  let autocompleteDestiny = new google.maps.places.Autocomplete(destiny);
}




function geocodeAddress(geocoder, resultsMap) {
  var address = destiny.value;

  geocoder.geocode({
    'address': address
  }, function (results, status) {
    if (status === 'OK') {


      longDestiny = results[0].geometry.location.lng();
      latDestiny = results[0].geometry.location.lat();

      localStorage.longDestiny = longDestiny;
      localStorage.latDestiny = latDestiny;

       } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }


  });

}



function geocodeAddressOr(geocoder, resultsMap) {
  var addressOrigin = origin.value;

  geocoder.geocode({
    'address': addressOrigin
  }, function (results, status) {
    if (status === 'OK') {


      longOrig = results[0].geometry.location.lng();
      latOrig = results[0].geometry.location.lat();

      localStorage.longOrig = longOrig;
      localStorage.latOrig = latOrig;

       } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }


  });

}


function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route({
    origin: origin.value,
    destination: destiny.value,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Ingrese direcciones correctas');
    }
  });
}

