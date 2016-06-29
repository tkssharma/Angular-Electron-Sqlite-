angular.module('formApp', ['ui.router'])

// configuring our routes 
// =============================================================================
.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider
	
		// route to show our basic form (/form)
		.state('form', {
			url: '/form',
			templateUrl: 'form.html',
			controller: 'formController'
		})
		
		// nested states 
		// each of these sections will have their own view
		// url will be nested (/form/profile)
		.state('form.profile', {
			url: '/profile',
			templateUrl: 'form-profile.html'
		})
		
		// url will be /form/interests
		.state('form.interests', {
			url: '/interests',
			templateUrl: 'form-interests.html'
		})
		
		// url will be /form/payment
		.state('form.payment', {
			url: '/payment',
			templateUrl: 'form-payment.html'
		});
		
	// catch all route
	// send users to the form page 
	$urlRouterProvider.otherwise('/form/profile');
})

// our controller for the form
// =============================================================================
.controller('formController', formController);
formController.$inject = ['$scope','daoService'];


function formController($scope,daoService ) {

	$scope.create= function(data){
	daoService.createNewUser().then(function(){ 
		console.log("insert done");
		$scope.formData =  'insert done successfully dummy data ' + data;
	});
   }  

	$scope.delete= function(){
	  daoService.getUser('neverguessthis@foo.bar').then(function(data){
	   console.log("fetch done"+data);
	   $scope.formData = data;
	 });  
   }
  $scope.fetch= function(){
	daoService.getUserById('1').then(function(data){ 
		console.log("fetch done"+data);
		$scope.formData = data;
	});
  }
	// we will store all of our form data in this object
	$scope.formData = {};

	
}

