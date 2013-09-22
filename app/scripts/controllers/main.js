'use strict';

angular.module('markopoloApp')
  .controller('MainCtrl', function ($scope, Facebook, Geolocation,Location, Text) {
    $scope.ranges = [1, 3, 5, 10, 15, 25, 50, 100];
    $scope.range = 5;
    $scope.sendAMarco = function() {
       var selected = $scope.users.filter(function(d) { return d.selected });
       selected.map(function(d) { Text.text(d.number, 'Darren has sent you a MARCO because he\'s in your town. Reply with POLO to get together!')});
    }
    var users =
       [{
           name: 'Nick Rushton',
           number: '2062767612',
           image: 'img/nick.jpg',
           user_id: 0
        },
        {
           name: 'Taylor Parks',
           number: '2069408189',
           image: 'img/taylor.jpg',
           user_id: 1
        },
        {
           name: 'Jun Hwang',
           number: '9179216022',
           user_id: 2
        },
        {
           name: 'Jaryd Madlena',
           number: '2532199558',
           image: 'img/jaryd.jpg',
           user_id: 3
        },
        {
           name: 'Kristen Petche',
           number: '5033200556',
           user_id: 4,
           image: 'img/kristen.jpg'
        },
        {
           name: 'Norman Wu',
           number: '2069476818',
           user_id:5
        },
        {
           name: 'Victoria Robertson',
           number: '6193709896',
           user_id:6
        },
        {
           name: 'Chenyu Wang',
           number: '2065125042',
           image: 'img/chenyu.jpg',
           user_id:7
        },
        {
           name: 'Mike Kidd',
           number: '4258767612',
           image: 'img/mike.jpg',
           user_id:8
        },
        {
           name: 'Jay Zeng',
           number: '2068547092',
           user_id:9
        }];

    Geolocation.getLocation(function(place){
       $scope.location = place;
       $scope.users = [];
       $scope.$apply();
       var user = users[Math.floor(Math.random() * 10)];
       user.place = place;
       Location.save(user)
       var ids = [];
       setInterval(function(){
          Location.find().then(function(data) {
             var n = data.data.filter(function(d) { return ids.indexOf(d._id) < 0; });
             angular.forEach(n,function(d) { $scope.users.unshift(d)});
             angular.forEach($scope.users, function(d) { d.distanceFrom = Math.floor(Geolocation.distanceFrom(d.place.coords.latitude,d.place.coords.longitude, user.place.coords.latitude, user.place.coords.longitude)*5280);});
             ids = data.data.map(function(d) { return d._id;});
          });
       }, 1000);
    })
  });
