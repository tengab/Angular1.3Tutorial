var myApp = angular.module('myApp', ['ngMessages', 'ngResource'])

myApp.controller('mainController', ['$scope', '$filter', '$timeout', '$http', function ($scope, $filter, $timeout, $http) {

    $scope.handle = ''

    $scope.lowerCaseHandle = function () {
        return $filter('lowercase')($scope.handle)
    }

    $scope.$watch('handle', function (newValue, oldValue) {
        console.info('changed!')
        console.log('old:' + oldValue)
        console.log('new:' + newValue)
    })

    $scope.characters = 5

    $scope.rules = [
        { ruleName: 'Must be 5 characters' },
        { ruleName: 'Must not be used elsewhere' },
        { ruleName: 'Must be cool' }
    ]


    $scope.alertClick = function () {
        console.log('klik')
        alert('Clicked alert')
    }

    $scope.name = 'Tomek'

    $http.get('https://randomuser.me/api/?results=5')
        .success(function (result) {
            console.log(result.results)
            $scope.rules = result.results
        })
        .error(function (data, status) {
            console.log('data ' + data)
            console.log('status ' + status)
        })

        $scope.newRule = ''
        $scope.addRule = function() {

            $http.post('https://tomaszbanach01-sandbox.firebaseio.com/homeworkTaskList', {name : $scope.newRule})
            .success(function(result) {
                $scope.rules = result
                $scope.newRule = ''  //clear textbox
            })
            .error(function(data, status){
                console.log('ERROR' + data)
            })

        }

}])

