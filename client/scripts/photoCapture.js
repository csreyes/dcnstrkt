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

          var category = 'amazon' || 'something'
           
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

                    function OpenInNewTab(url) {
                      var win = window.open(url, '_blank');
                      win.focus();
                    }

                    OpenInNewTab(url);
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
