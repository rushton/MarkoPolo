'use strict';

angular.module('markopoloApp')
  .service('Text', function Text($http) {
     return {
        text: function(number, message) {
          var data = {to: number, from:'4254092938', body: message};
          return  $http.post('http://localhost:8080/text', data)
        }
     };
  });
