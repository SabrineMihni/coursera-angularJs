(function () {

'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController',ToBuyController)
.controller('AlreadyBoughtController',AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)
;

/**
*
**/
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
	
	var itemBuyer = this;

	itemBuyer.items_to_buy = 
	ShoppingListCheckOffService.getItemsToBuy();
	
	itemBuyer.buyItem = function(index) {
		ShoppingListCheckOffService.itemBought(index);
	}

}

/**
*
**/
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
	var itemBought = this;

	itemBought.items_bought = 
	ShoppingListCheckOffService.getItemsBought();
	

}

/**
*
**/
function ShoppingListCheckOffService() {
	
	var service = this;

	var items_bought = [];

	var items_to_buy = [
			{name: "Cookies", quantity: 10},
			{name: "Water", quantity: 5},
			{name: "Pizza", quantity: 2},
			{name: "Soap", quantity: 5},
			{name: "Cat's food", quantity: 4}
		];

	 service.getItemsToBuy = function() {
	 	return items_to_buy;
	 };

	 service.getItemsBought = function() {
	 	return items_bought;
	 };

	 service.itemBought = function(index) {
	 	
	 	items_bought.push(items_to_buy[index]);
 		items_to_buy.splice(index,1);
	 };

}

})();