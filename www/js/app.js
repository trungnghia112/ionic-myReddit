(function () {

    var app = angular.module('myreddit', ['ionic','angularMoment'])

        app.controller('RedditCtrl', function($http, $scope){
            $scope.stories = [];


            /*
            * Load more stories
            */
            $scope.loadMoreStories = function(){
                var params = {}
                if($scope.stories.length > 0){
                    params['after'] = $scope.stories[$scope.stories.length - 1].name;
                }

                //console.log(params);

                $http.get('https://www.reddit.com/r/funny/.json?limit=6',{params:params})
                    .success(function(response){
                        //console.log(response);
                        angular.forEach(response.data.children, function(child){
                            //console.log(child.data);
                            $scope.stories.push(child.data);
                        });
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    });

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
