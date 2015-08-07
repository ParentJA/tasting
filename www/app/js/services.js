(function (window, angular, undefined) {
  "use strict";

  function authenticationService($http, $cookies, $state, BASE_URL) {
    this.signUp = function signUp(username, password, email, firstName, lastName) {
      var self = this;

      return $http({
        method: "POST",
        url: BASE_URL + "accounts/",
        data: {
          username: email,
          password: password,
          email: email,
          first_name: firstName,
          last_name: lastName
        }
      }).then(onSignUpSuccess, onSignUpFailure);

      function onSignUpSuccess() {
        self.logIn(username, password);
      }

      function onSignUpFailure() {
        console.error("Sign up failed!");
      }
    };

    this.logIn = function logIn(username, password) {
      var self = this;

      return $http({
        method: "POST",
        url: BASE_URL + "auth/login/",
        data: {
          username: username,
          password: password
        }
      }).then(onLogInSuccess, onLogInFailure);

      function onLogInSuccess(data) {
        self.setAuthenticatedUser(data);

        $state.go("home");
      }

      function onLogInFailure() {
        console.log("Log in failed!")
      }
    };

    this.logOut = function logOut() {
      var self = this;

      return $http({
        method: "POST",
        url: BASE_URL + "auth/logout/"
      }).then(onLogOutSuccess, onLogOutFailure);

      function onLogOutSuccess() {
        self.unauthenticate();

        $state.go("home");
      }

      function onLogOutFailure() {
        console.error("Log out failed!");
      }
    };

    this.getAuthenticatedUser = function getAuthenticatedUser() {
      if (!$cookies.get("authenticatedUser")) {
        return;
      }

      return JSON.parse($cookies.get("authenticatedUser"));
    };

    this.isAuthenticated = function isAuthenticated() {
      return !!$cookies.get("authenticatedUser");
    };

    this.setAuthenticatedUser = function setAuthenticatedUser(user) {
      $cookies.put("authenticatedUser", JSON.stringify(user));
    };

    this.unauthenticate = function unauthenticate() {
      $cookies.remove("authenticatedUser");
    };
  }

  function eventsService($http, BASE_URL) {
    this.list = function list() {
      var url = BASE_URL + "events/";

      return $http({
        method: "GET",
        url: url
      });
    };

    this.create = function create(data) {
      var url = BASE_URL + "events/";

      return $http({
        method: "POST",
        url: url,
        data: data
      });
    };

    this.retrieve = function retrieve(id) {
      var url = BASE_URL + "events/" + id + "/";

      return $http({
        method: "GET",
        url: url
      });
    };

    this.update = function update(id, data) {
      var url = BASE_URL + "events/" + id + "/";

      return $http({
        method: "PUT",
        url: url,
        data: data
      });
    };

    this.destroy = function destroy(id) {
      var url = BASE_URL + "events/" + id + "/";

      return $http({
        method: "DELETE",
        url: url
      });
    };
  }

  angular.module("app")
    .service("authenticationService", ["$http", "$cookies", "$state", "BASE_URL", authenticationService])
    .service("eventsService", ["$http", "BASE_URL", eventsService]);

})(window, window.angular);