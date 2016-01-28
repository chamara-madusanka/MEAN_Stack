(function(){

    var app = angular.module('contactListApp', []);

    app.controller('appCtrl', function($scope, $http) {
        console.log("Hi from controller");

        var refresh = function() {
            $http.get('/contactlist').success(function(response) {

                console.log("Hi recieved data from the server.");
                $scope.contactList = response;
                $scope.contact = "";

            });
        };

        $scope.remove = function(id) {
            console.log(id);
            $http.delete('/contactlist/' + id).success(function(response) {
                refresh();
            });
        };

        refresh();

        $scope.addContact = function() {
            console.log($scope.contact);

            $http.post('/contactlist', $scope.contact).success(function(response) {
                console.log(response);
                refresh();
            });
        };

        $scope.edit = function(id) {
            $http.get('/contactlist/' + id).success(function(response) {
                $scope.contact = response;
            });
        };

        $scope.update = function() {
            console.log($scope.contact._id);
            $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function() {
                refresh();
            });
        };

        $scope.clear = function() {
            $scope.contact = "";
        }

    });

})();