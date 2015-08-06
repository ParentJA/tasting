(function (window, angular, undefined) {
  "use strict";

  function MainController($scope, authenticationService) {
    $scope.isUserAuthenticated = function isUserAuthenticated() {
      return authenticationService.isAuthenticated();
    };

    $scope.getUser = function getUser() {
      return authenticationService.getAuthenticatedUser();
    };

    $scope.logOut = function logOut() {
      return authenticationService.logOut();
    };
  }

  function HomeController($scope, authenticationService) {
    $scope.isUserAuthenticated = function isUserAuthenticated() {
      return authenticationService.isAuthenticated();
    };
  }

  function LogInController($scope, $state, authenticationService) {
    $scope.models = {
      logInForm: "",
      username: "",
      password: ""
    };

    $scope.logIn = function logIn() {
      authenticationService.logIn($scope.models.username, $scope.models.password);
    };

    function init() {
      if (authenticationService.isAuthenticated()) {
        $state.go("home");
      }
    }

    init();
  }

  function SignUpController($scope, authenticationService) {
    $scope.models = {
      signUpForm: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: ""
    };

    $scope.signUp = function signUp() {
      authenticationService.signUp(
        $scope.models.email,
        $scope.models.password,
        $scope.models.email,
        $scope.models.firstName,
        $scope.models.lastName
      );
    }
  }

  angular.module("app")
    .controller("MainController", ["$scope", "authenticationService", MainController])
    .controller("HomeController", ["$scope", "authenticationService", HomeController])
    .controller("LogInController", ["$scope", "$state", "authenticationService", LogInController])
    .controller("SignUpController", ["$scope", "authenticationService", SignUpController]);

})(window, window.angular);