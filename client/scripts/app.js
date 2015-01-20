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
	
	$scope.click = function(category){
		console.log(category);
		// var snapshot = document.querySelector('canvas');
		// var video = document.getElementById('sourcevid');
		// video.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		// snapshot.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
		// pic = snapshot.toDataURL("image/png");
		// base64 = pic.replace(/^data:image\/(png|jpg);base64,/, "");

		// $.ajax({
		//         type: 'POST',
		//         url: '/post',
		//         data: {'base64': base64,
		//               'category': category
		//       },
		//         contentType: 'application/x-www-form-urlencoded',
		//         dataType: 'json',
		//         success: function (url) {
		//           console.log('this is a post success and here is the url ', url);

		//           function OpenInNewTab(url) {
		//             var win = window.open(url, '_blank');
		//             win.focus();
		//           }

		//           OpenInNewTab(url);
		//         },
		//         error: function(jq, err) {
		//           console.log('this is the jq', jq);
		//           console.log('this is the err ', err);
		//         }
		//     });
	};



}]);
	