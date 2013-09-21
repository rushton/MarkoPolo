'use strict';

angular.module('markopoloApp')
  .service('Geolocation', function Geolocation() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var geocoder = new google.maps.Geocoder();
    function getExtra(lat,long, callback) {
         var latlng = new google.maps.LatLng(lat, long);
         geocoder.geocode({'latLng': latlng}, function(results, status) {
            var r = results[0].address_components.filter(function(data) {
               return data.types[0] == 'administrative_area_level_1' || data.types[0] == 'locality' || data.types[0] == 'neighborhood';   
            })
            var names = r.map(function(d) { var o = {}; o[d.types[0]] = d.short_name; return o });
            var final = {};
            angular.forEach(names, function(v,k) {
               angular.forEach(v, function(value,key) {
                  final[key] = value;
               });
            })
            final.coords = {latitude: lat, longitude: long}
            callback(final)
         })
    }
    return {
       getLocation: function(callback) {
         navigator.geolocation.getCurrentPosition(function(pos) {
            getExtra(pos.coords.latitude,pos.coords.longitude,callback);  
       })
      }
    }
  });
