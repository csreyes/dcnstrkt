window.addEventListener('DOMContentLoaded', function() {
	var video = document.getElementById('sourcevid');

	function hasGetUserMedia() {
	  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
             navigator.mozGetUserMedia || navigator.msGetUserMedia);
  }

  var snapshot = document.querySelector('canvas');   


  document.querySelector('button').addEventListener('click',function(){
          snapshot.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
          pic = snapshot.toDataURL("image/png");
          
          base64 = pic.replace(/^data:image\/(png|jpg);base64,/, "");

          $.ajax({
                  type: 'POST',
                  url: '/',
                  data: {'base64': base64},
                  contentType: 'application/x-www-form-urlencoded',
                  dataType: 'json',
                  success: function (msg) {
                    console.log('this is a post success');
                    // console.log('this is the success results ', msg);
                    var name = msg.name;
                    console.log('this is the name from msg ', name);
                    function OpenInNewTab(url) {
                      var win = window.open(url, '_blank');
                      win.focus();
                    }
                    OpenInNewTab('http://www.google.com')
                  },
                  error: function(jq, err) {
                    console.log('this is the jq', jq);
                    console.log('this is the err ', err);
                  }
              });

  });

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
