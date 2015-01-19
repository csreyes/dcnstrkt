angular.module("dcnstrkt", [])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		templateUrl: '/',
		controller: "MainController"
	})
	.otherwise({
		redirectTo: '/'
	});
}])


.controller("MainController", ["$scope", "$http", function($scope, $http) {
	
	$scope.click = function(){
		$http.post('/')
		.then(function(resp) {
			console.log(5)
			console.log(resp);
		})
	};
}]);
	// var req = {
	// 	url: 'https://camfind.p.mashape.com/image_requests', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
	// 	      type: 'POST', // The HTTP Method
	// 	      headers: {"X-Mashape-Key": "ryyZi5vdbsmshXk9ZBSHz4bi5Opqp1D7jDFjsnjahWQivzJltF"},
	// 	      data: {
	// 	      "image_request[locale]": "en_US",
	// 	      "image_request[language]": "en",
	// 	      "image_request[device_id]": "<image_request[device_id]>",
	// 	      "image_request[latitude]": "35.8714220766008",
	// 	      "image_request[longitude]": "14.3583203002251",
	// 	      "image_request[altitude]": "27.912109375",
	// 	      "focus[x]": "480",
	// 	      "focus[y]": "640",
	// 	      "image_request[remote_image_url]": "http://media.chick-fil-a.com/Media/Img/catalog/Food/XLarge/Sausage-Breakfast-Burrito.png"

	// 	      }, // Additional parameters here
	// 	          datatype: 'json',
	// 	          success: function(data) { console.log('success', data); },
	// 	          error: function(err) { alert(err); }
	// 	      };


	// var req = {
	// 	method: 'POST',
	// 	url: "https://camfind.p.mashape.com/image_requests",
	// 	headers: {
	// 		"X-Mashape-Key": "ryyZi5vdbsmshXk9ZBSHz4bi5Opqp1D7jDFjsnjahWQivzJltF"
	// 	}
	// }

		// $http.post("https://camfind.p.mashape.com/image_requests")
		// .header("X-Mashape-Key", "ryyZi5vdbsmshXk9ZBSHz4bi5Opqp1D7jDFjsnjahWQivzJltF")
		// .header("Content-Type", "application/x-www-form-urlencoded")
		// .header("Accept", "application/json")
		// .send("focus[x]", "480")
		// .send("focus[y]", "640")
		// .send("image_request[altitude]", "27.912109375")
		// .send("image_request[language]", "en")
		// .send("image_request[latitude]", "35.8714220766008")
		// .send("image_request[locale]", "en_US")
		// .send("image_request[longitude]", "14.3583203002251")
		// .send("image_request[remote_image_url]", "http://upload.wikimedia.org/wikipedia/en/2/2d/Mashape_logo.png")
		// .end(function (result) {
		//   console.log(result.status, result.headers, result.body);
	// 	// });
	// $scope.click = function() {
	// 	$http(req)
	// 	.then(function(resp) {
	// 		console.log(resp);
	// 	});
	// }



// burrito http://media.chick-fil-a.com/Media/Img/catalog/Food/XLarge/Sausage-Breakfast-Burrito.png