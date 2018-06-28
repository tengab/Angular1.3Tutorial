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

    $scope.people = 
        [
            {
                name: 'John Doe',
                address: ' 555 Main St.',
                city: 'New York',
                state: 'NY',
                zip: '11111'
            },
            {
                name: 'Jane Doe',
                address: ' 333 Second St.',
                city: 'Buffalo',
                state: 'NY',
                zip: '22222'
            },
            {
                name: 'Steve Doe',
                address: ' 1234 Third St.',
                city: 'York',
                state: 'NY',
                zip: '3333'
            }
        ]
    

    $scope.formattedAddress = function (person) {

        return person.address + ',' + person.city + ',' + person.state + ',' + person.zip

    }

}])

myApp.directive('searchResult', function () {
    return {
        restrict: 'AE', //A to show directive as attribute only, E to show directive as element only, AE both /default setting/ , C to show directive as class
        templateUrl: 'directives/searchresult.html',
        replace: true,
        scope: {
            personObject: '=',
            formattedAddressFunction: '&'
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

