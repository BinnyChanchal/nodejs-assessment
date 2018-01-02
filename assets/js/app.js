angular.module('App', []).
controller('productListingController', ['$http','$window','$sce', function($http,$window,$sce) {
	var vm = this;
	vm.products =[];
	vm.selectedProduct = null;
	
	$http({
      method: 'GET',
      url: '/products'
    }).then(function (response) {
    	vm.products = response.data;
    });

    vm.showCurrentProduct = function(product){
    	vm.selectedProduct = product;
    }

    vm.addToCart = function(product){
    	$window.alert("Price of the item : $" +product.networkPrice);
    }

    vm.renderHTML = function(html_code){
        return $sce.trustAsHtml(html_code);
    };
}]);