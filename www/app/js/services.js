(function (window, angular, undefined) {
  "use strict";

  function authenticationService($cookies, $state, Restangular) {
    this.signUp = function signUp(username, password, email, firstName, lastName) {
      var self = this;

      return Restangular.all("accounts").post({
        username: email,
        password: password,
        email: email,
        first_name: firstName,
        last_name: lastName
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

      return Restangular.all("auth").all("login").post({
        username: username,
        password: password
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

      return Restangular.all("auth").all("logout").post().then(onLogOutSuccess, onLogOutFailure);

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

  angular.module("app")
    .service("authenticationService", ["$cookies", "$state", "Restangular", authenticationService]);

})(window, window.angular);