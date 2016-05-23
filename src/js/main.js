var myApp = angular.module('myApp', ['ui.bootstrap'])

myApp.controller('MyCtrl',function($scope,$filter) {
    $scope.componentNumber=15713318022;
    $scope.filterText=$filter('tel')($scope.componentNumber);


    $scope.setValue=function (value){
        $scope.codeVal=value;
    }
    $scope.setValue(1);

});

myApp.directive('phoneInput', function($filter) {

    return {
        require: 'ngModel',
        link: function($scope, $element, $attrs, ngModelCtrl) {
            var listener = function() {
                var value = $element.val().replace(/[^0-9]/g, '');
                $element.val($filter('tel')(value, false));
            };

            // This runs when we update the text field
            ngModelCtrl.$parsers.push(function(viewValue) {
                return viewValue.replace(/[^0-9]/g, '').slice(0,10);
            });

            // This runs when the model gets updated on the scope directly and keeps our view in sync
            ngModelCtrl.$render = function() {
                $element.val($filter('tel')(ngModelCtrl.$viewValue, false));
            };
        }
    };
});

myApp.filter('tel', function () {

    return function (tel) {
        console.log(tel);
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var state="";
        var city="";
        var number="";
        var country="";


        if(value.length < 2) {
            country=value;
        }
        else if(value.length > 2){
            country=value.slice(0,2);
            state=value.slice(2,5);
        }

        else if(value.length>5) {
            country=value.slice(0,2);
            state=value.slice(2,5);
            city=value.slice(5);
        }
        else(value.length>8)
        {
            number = value.slice(-4);
            city = value.slice(-7, -4);
            state = value.slice(-10,-7);
            country=value.slice(-(value.length),-10);
        }

        return ("+" +country+" ("+state+") "+city+"-"+number).trim();

    };
});
