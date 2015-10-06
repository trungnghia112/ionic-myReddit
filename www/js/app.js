(function () {

    var app = angular.module('myreddit', ['ionic'])

        app.controller('RedditCtrl', function($scope){
            $scope.stories = [
                {
                    title: 'First Story'
                },
                {
                    title: 'Second Story'
                }
            ];
        });

        app.run(function ($ionicPlatform) {
            $ionicPlatform.ready(function () {
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
            });
        });

}());
