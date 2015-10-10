(function () {

    var app = angular.module('myreddit', ['ionic','angularMoment'])

        app.controller('RedditCtrl', function($http, $scope){
            $scope.stories = [];

            function loadStories(params, callback){
                //$http.get('https://www.reddit.com/r/funny/.json?limit=6&before=t3_3o61h9',{params:params})
                $http.get('https://www.reddit.com/r/funny/new/.json',{params:params})
                    .success(function(response){
                        var stories = [];
                        angular.forEach(response.data.children, function(child){
                            stories.push(child.data);
                        });
                        callback(stories);
                    });
            }
            /*
            * Load more stories
            */
            $scope.loadMoreStories = function(){
                var params = {}
                if($scope.stories.length > 0){
                    params['after'] = $scope.stories[$scope.stories.length - 1].name;
                }
                loadStories(params, function(data){
                    console.log(data);
                    $scope.stories = $scope.stories.concat(data);
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                })
            };
            /*
             * Do refresh stories
             */
            $scope.doRefreshStories = function(){
                var params = {}
                params['before'] = $scope.stories[0].name;

                loadStories(params, function(data){
                    console.log(data);
                    $scope.stories = data.concat($scope.stories);
                    $scope.$broadcast('scroll.refreshComplete');
                })
            };


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
