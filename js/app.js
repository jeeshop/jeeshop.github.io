(function () {

    var app = angular.module('jeeshopSite', ['ngCookies', 'ngSanitize', 'ui.router', 'pascalprecht.translate']);


    app.controller('HomeSlidesController', function ($scope) {
        var ctrl = this;

        $scope.numberOfSlides = 3;
        $scope.getNumber = function (num) {
            return new Array(num);
        }
    });

    app.config(function ($stateProvider, $urlRouterProvider, $translateProvider, $translatePartialLoaderProvider,$locationProvider) {
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("home");

        $locationProvider.hashPrefix("!")

        // Now set up the states
        $stateProvider
            .state('home', {
                url: "/home",
                templateUrl: "partials/home.html",
                controller: function ($translatePartialLoader, $translate) {
                    $translatePartialLoader.addPart('home');
                    $translate.refresh();
                }
            })
            .state('index', {
                url: "",
                templateUrl: "partials/home.html",
                controller: function ($translatePartialLoader, $translate) {
                    $translatePartialLoader.addPart('home');
                    $translate.refresh();
                }
            })
            .state('about', {
                url: "about",
                templateUrl: "partials/about.html",
                controller: function ($translatePartialLoader, $translate) {
                    $translatePartialLoader.addPart('about');
                    $translate.refresh();
                }
            });

        // TODO pull request to angular-translate
        var getLocale = function () {
            var availableLang = ['en', 'fr'];
            var nav = window.navigator;
            var locale = ((angular.isArray(nav.languages) ? nav.languages[0] : nav.language || nav.browserLanguage || nav.systemLanguage || nav.userLanguage) || '').split('-').join('_');

            var lang_id = locale.substr(0, 2);
            if (!locale || locale.length == 0 || availableLang.indexOf(lang_id) == -1) {
                locale = 'en';
            }
            return lang_id;
        };

        $translatePartialLoaderProvider.addPart('about');
        $translatePartialLoaderProvider.addPart('common');
        $translatePartialLoaderProvider.addPart('home');
        $translatePartialLoaderProvider.addPart('projects');

        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: 'i18n/{part}/locale-{lang}.json'
        });

        $translateProvider.determinePreferredLanguage(function () {
            return getLocale();
        });
    });

})();