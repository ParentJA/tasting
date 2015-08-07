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

  function EventsController($scope, eventsService, events) {
    var formVisible = false;

    $scope.models = {
      events: events,
      event: {
        id: null,
        name: "",
        description: "",
        start_dt: null,
        end_dt: null
      },
      eventForm: ""
    };

    $scope.hasEvents = function hasEvents() {
      return !_.isEmpty($scope.models.events);
    };

    $scope.isFormVisible = function isFormVisible() {
      return formVisible;
    };

    $scope.setFormVisible = function setFormVisible(value) {
      formVisible = value;
    };

    $scope.selectEvent = function selectEvent(event) {
      $scope.models.event = (function (event) {
        return {
          id: event.id,
          name: event.name,
          description: event.description,
          start_dt: new Date(event.start_dt),
          end_dt: new Date(event.end_dt)
        }
      })(event);

      $scope.setFormVisible(true);
    };

    $scope.resetEvent = function() {
      $scope.models.event = {
        id: null,
        name: "",
        description: "",
        start_dt: null,
        end_dt: null
      }
    };

    $scope.createEvent = function createEvent() {
      $scope.resetEvent();
      $scope.setFormVisible(true);
    };

    $scope.submitEvent = function submitEvent() {
      var eventId = $scope.models.event.id;

      // Update existing event...
      if (eventId) {
        console.log("Event id:", eventId);
        console.log("Event:", $scope.models.event);

        eventsService.update(eventId, $scope.models.event)
          .then(onEventSuccess, onEventFailure).finally(onEventFinally);
      }

      // Create new event...
      else {
        eventsService.create($scope.models.event)
          .then(onEventSuccess, onEventFailure).finally(onEventFinally);
      }

      function onEventSuccess() {
        eventsService.list().then(function (response) {
          $scope.models.events = response.data;
        });
      }

      function onEventFailure(data) {
        console.error("Failure!");
        console.log(data);
      }

      function onEventFinally() {
        $scope.cancel();
      }
    };

    $scope.cancel = function cancel() {
      $scope.setFormVisible(false);
      $scope.resetEvent();
    };

    function init() {
      eventsService.list().then(function (response) {
        $scope.models.events = response.data;
      });
    }

    init();
  }

  angular.module("app")
    .controller("MainController", ["$scope", "authenticationService", MainController])
    .controller("HomeController", ["$scope", "authenticationService", HomeController])
    .controller("LogInController", ["$scope", "$state", "authenticationService", LogInController])
    .controller("SignUpController", ["$scope", "authenticationService", SignUpController])
    .controller("EventsController", ["$scope", "eventsService", EventsController]);

})(window, window.angular);