(function () {

    var app = angular.module('myreddit', ['ionic'])

        app.controller('RedditCtrl', function($http, $scope){
            $scope.stories = [];
            $http.get('https://www.reddit.com/r/gaming/.json')
                .success(function(response){
                    console.log(response);
                    angular.forEach(response.data.children, function(child){
                        $scope.stories.push(child.data);
                    });
                });
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
