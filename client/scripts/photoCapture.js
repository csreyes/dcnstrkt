window.addEventListener('DOMContentLoaded', function() {

	function hasGetUserMedia() {
	  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
             navigator.mozGetUserMedia || navigator.msGetUserMedia);
  }
  

	if (hasGetUserMedia()) {
	  console.log('we good !')
	  navigator.webkitGetUserMedia({audio: false, video: true}, function(stream) {
	  var video=document.querySelector('video');
	  video.src = window.URL.createObjectURL(stream);
	  video.play();
	  }, function(error) {console.log(error)});
	} else {
	  alert('getUserMedia() is not supported in your browser');
	}

}) 
