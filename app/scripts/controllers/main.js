'use strict';

angular.module('markopoloApp')
  .controller('MainCtrl', function ($scope, Facebook) {
    $scope.user = Facebook.getUser(FB);
  });
