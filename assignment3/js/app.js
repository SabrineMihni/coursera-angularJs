(function () {

'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
	var controller = this;

	controller.found = [];
	controller.search = '';
	controller.msg = '';
	controller.getItems = function() {

	 	 
	 	if(controller.search !== '') {
			controller.msg = '';
			var promise = MenuSearchService
			.getMatchedMenuItems(controller.search);
			promise.then(function(result) {
				controller.found = result;
				controller.msg = result.length > 0 ? '' : "Nothing Found!";
			});
	 	}else {
	 		controller.msg = 'Nothing Found!';
	 	}

		
	}
	controller.onRemove = function(index) {
		controller.found.splice(index, 1);
	}
	 

}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
	var service = this;

	service.getMatchedMenuItems = function(searchTerm) {
		console.log('into the service');
		return $http({
			method: "GET",
			url: ('https://davids-restaurant.herokuapp.com/menu_items.json')
		})
		.then(function(result) {
			var foundItems = [];

			var data = result.data.menu_items

			data.forEach(element => {
				if(element.description.indexOf(searchTerm) !== -1) {
					foundItems.push(element);
				}
			});

			return foundItems;
		})
	};
}


function FoundItemsDirective() {
  var ddo = {
    templateUrl: './pages/FoundItems.html',
    scope: {
      found: '<',
      onRemove: '&'
    },
     transclude: true
  };

  return ddo;
}



})();