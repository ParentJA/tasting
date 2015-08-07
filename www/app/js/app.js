(function (window, angular, undefined) {
  "use strict";

  function HttpConfig($httpProvider) {
    $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
    $httpProvider.defaults.xsrfCookieName = "csrftoken";
  }

  function UiRouterConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("home", {
        url: "/",
        templateUrl: "/static/views/home.html",
        controller: "HomeController"
      })
      .state("log_in", {
        url: "/log_in",
        templateUrl: "/static/views/log_in.html",
        controller: "LogInController"
      })
      .state("sign_up", {
        url: "/sign_up",
        templateUrl: "/static/views/sign_up.html",
        controller: "SignUpController"
      })
      .state("events", {
        url: "/events",
        templateUrl: "/static/views/events.html",
        controller: "EventsController"
      });

    //Default state...
    $urlRouterProvider.otherwise("/");
  }

  function UiRunner($rootScope, $state) {
    $rootScope.$state = $state;
  }

  angular.module("app", ["ngCookies", "ui.router"])
    .constant("BASE_URL", "/api/v1/")
    .config(["$httpProvider", HttpConfig])
    .config(["$stateProvider", "$urlRouterProvider", UiRouterConfig])
    .run(["$rootScope", "$state", UiRunner]);

})(window, window.angular);