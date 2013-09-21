'use strict';

angular.module('markopoloApp')
  .service('Locationposter', function Locationposter($http) {
      return {
         save: function(location) {
            return $http.post('http://localhost:8080/location', location)
         }
      }
  });
