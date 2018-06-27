var myApp = angular.module('myApp', ['ngMessages', 'ngResource'])

myApp.controller('mainController', ['$scope', '$filter', '$timeout', function ($scope, $filter, $timeout) {

    $scope.handle = ''

    $scope.lowerCaseHandle = function () {
        return $filter('lowercase')($scope.handle)
    }

    $scope.$watch('handle', function (newValue, oldValue) {
        console.info('changed!')
        console.log('old:' + oldValue)
        console.log('new:' + newValue)
    })



}])

