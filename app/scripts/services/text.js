'use strict';

angular.module('markopoloApp')
  .service('Text', function Text($http) {
     return {
        text: function(number, message) {
          var data = {to: number, from:'4254092938', body: message};
          return  $http.post('http://10.5.193.239:8080/text', data)
        }
     };
  });
