'use strict';

angular.module('markopoloApp')
  .factory('Facebook', function ($rootScope, $q) {
      var resolve = function(errval, retval, deferred) {
        $rootScope.$apply(function() {
          if (errval) {
            deferred.reject(errval);
          } else {
            retval.connected = true;
            deferred.resolve(retval);
          }
        });
      }

      return {
        getFriends: function(FB) {
          var deferred = $q.defer();
          FB.getLoginStatus(function(response) {
              FB.api('/me/friends', function(response) {
                resolve(null, response, deferred);
              });
          });

          var promise = deferred.promise;
          return promise;
        },
        getFriendsLocal: function(FB) {
          var deferred = $q.defer();
          FB.getLoginStatus(function(response) {
              FB.api('/me/friends', function(response) {
                resolve(null, response, deferred);
                if(deferred.promise){
                  angular.forEach(response.data,function(index,friend) {                
                    FB.api('/'+friend.id, function(response) {
				      console.log(friend.id+':'+response.location);
	                });
	              });
                }
              });
          });
          var promise = deferred.promise;
          return promise;
        },
        getUser: function(FB) {
          var deferred = $q.defer();
          FB.getLoginStatus(function(response) {
            if (response.status == 'connected') {
              FB.api('/me', function(response) {
                resolve(null, response, deferred);
              });
            } else if (response.status == 'not_authorized') {
              FB.login(function(response) {
                if (response.authResponse) {
                  FB.api('/me', function(response) {
                    resolve(null, response, deferred);
                  });
                } else {
                  resolve(response.error, null, deferred);
                }
              }, {scope: 'email,user_likes'});
            }
          });

          var promise = deferred.promise;
          promise.connected = false;
          return promise;
        }

      };
  });
