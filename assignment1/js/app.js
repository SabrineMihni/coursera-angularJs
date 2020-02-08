(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);

function LunchCheckController($scope) {
  $scope.listOfItems = "";
  $scope.message = "";
  $scope.messageType = "";

  $scope.getMessage = function () {

  	if($scope.listOfItems != "") {
		$scope.messageType = "success";
	  	let nbOfItems = $scope.listOfItems.split (',')
	  	.filter(function(el) {
	  		return el.length != 0
	  	})
	  	.length;

	  	$scope.message = nbOfItems <= 3 ? "Enjoy!" : "Too much!";

	  }else {
	  	$scope.message = "Please enter data first";
	  	$scope.messageType = "error";
	  }
    

  };
};

LunchCheckController.$inject = ['$scope'];







})();
