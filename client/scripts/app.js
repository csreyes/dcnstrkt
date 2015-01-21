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
		$scope.spinner = new Spinner().spin();
		$scope.flash();
		console.log($('.videoContainer').append)
		$('.videoContainer').append($scope.spinner.el);
		var snapshot = document.querySelector('canvas');
		var video = document.getElementById('sourcevid');
		snapshot.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
		pic = snapshot.toDataURL("image/png");
		base64 = pic.replace(/^data:image\/(png|jpg);base64,/, "");

		$.ajax({
		        type: 'POST',
		        url: '/post',
		        data: {'base64': base64,
		              'category': category
		      },
		        contentType: 'application/x-www-form-urlencoded',
		        dataType: 'json',
		        success: function (url) {
		          console.log('this is a post success and here is the url ', url);
		          $scope.loading = false;
		          function OpenInNewTab(url) {
		            var win = window.open(url, '_blank');
		            win.focus();
		          }
		          $scope.spinner.stop();
		          OpenInNewTab(url);
		        },
		        error: function(jq, err) {
		          console.log('this is the jq', jq);
		          $scope.spinner.stop();
		          console.log('this is the err ', err);
		        }
		    });
	};

	$scope.flash = function() {
		setTimeout(function() {
			$('.videoContainer').css('background-color', '#F0FFFF	')
	},100);
		setTimeout(function() {
			$('.videoContainer').css('background-color', 'black')
		},200);
	};


}]);
	