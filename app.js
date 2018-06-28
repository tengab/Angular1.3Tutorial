var myApp = angular.module('myApp', ['ngMessages', 'ngResource', 'ngRoute'])

myApp.config(function ($routeProvider) {
    $routeProvider
        .when('/first', {
            templateUrl: 'pages/first.html',
            controller: 'firstController'
        })
        .when('/second', {
            templateUrl: 'pages/second.html',
            controller: 'secondController'
        })
        .when('/second/:num', {
            templateUrl: 'pages/second.html',
            controller: 'secondController'
        })
})

myApp.service('nameService', function () {

    var self = this
    this.name = 'Tomek Banach'
    this.nameLength = function () {
        return self.name.length
    }
})

myApp.controller('firstController', ['$scope', '$log', 'nameService', function ($scope, $log, nameService) {

    $scope.person = {
        name: 'John Doe',
        address: ' 555 Main St., New York, NY'
    }

}])

myApp.directive('searchResult', function () {
    return {
        restrict: 'AE', //A to show directive as attribute only, E to show directive as element only, AE both /default setting/ , C to show directive as class
        templateUrl: 'directives/searchresult.html',
        replace: true,
        scope: {
            personName: '@',
            personAddress: '@'
        }
    }
})

myApp.controller('secondController', ['$scope', '$log', '$routeParams', 'nameService', function ($scope, $log, $routeParams, nameService) {

    // $scope.num = $routeParams.num || 'not defined'
    // $scope.name = nameService.name
    // $scope.$watch('name', function () {
    //     nameService.name = $scope.name
    // })
}])

myApp.controller('mainController', ['$scope', '$filter', '$timeout', '$http', '$log', 'nameService', function ($scope, $filter, $timeout, $http, $log, nameService) {

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

    $scope.name = nameService.name

    $scope.$watch('name', function () {
        nameService.name = $scope.name
    })

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
    $scope.addRule = function () {

        $http.post('https://tomaszbanach01-sandbox.firebaseio.com/homeworkTaskList', { name: $scope.newRule })
            .success(function (result) {
                $scope.rules = result
                $scope.newRule = ''  //clear textbox
            })
            .error(function (data, status) {
                console.log('ERROR' + data)
            })
    }

    $log.log(nameService.name)
    $log.log(nameService.nameLength())

}])

