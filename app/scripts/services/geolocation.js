'use strict';

angular.module('markopoloApp')
  .service('Geolocation', function Geolocation($q) {
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
    function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2-lat1);  // deg2rad below
      var dLon = deg2rad(lon2-lon1); 
      var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c; // Distance in km
      return d;
    }
 
    function deg2rad(deg) {
      return deg * (Math.PI/180)
    }
    function getDistanceFromLatLonInMiles(lat1,lon1,lat2,lon2) {
       return getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) * 0.62137;
    }
    function fromCity(fbUser) {
         var deferred = $q.defer();
         geocoder.geocode({'address': fbUser.location.name}, function(res) {
            deferred.resolve({lat: res[0].geometry.location.ob, long: res[0].geometry.location.pb, user: fbUser})
         })
         return deferred.promise;
    }
    return {
       getLocation: function(callback) {
         navigator.geolocation.getCurrentPosition(function(pos) {
            getExtra(pos.coords.latitude,pos.coords.longitude,callback);  
       })
      },
      fromCity: fromCity,
      findNearby: function(source,targets, range) {
         var deferred = $q.defer();
         $q.all(targets.map(function(v,k) {
            return fromCity(v)
         })).then(function(data){
               var v = data.filter(function(v,k) { 
                  return range > getDistanceFromLatLonInMiles(v.lat,v.long,source.lat,source.long) })
               deferred.resolve(v.map(function(v,k) { return v.user }));
         });
         return deferred.promise;
      }
    }
  });
