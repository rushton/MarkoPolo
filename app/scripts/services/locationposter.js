'use strict';

angular.module('markopoloApp')
  .service('Location', function Locationposter($http) {
      return {
         findNear: function(userLocation) {
            return $http.post('http://localhost:8080/location/near', {lat: userLocation.place.coords.lat, long: userLocation.place.coords.long, user_id: userLocation.user_id})
         },
         save: function(location) {
            return $http.post('http://localhost:8080/location', location)
         },
         find: function() {
            return $http.get('http://localhost:8080/location')
         }
      }
  });
