
$("#notification-tab").click(function(){
$( "#app-tabs" ).toggle();

});


/*$('.userid').click(function(){
$(this).next(".useridDetails ").toggle();
})*/
var x = document.getElementById("demo");
var latestkey = 0;

function showPosition(position) {
    var latlon = position.coords.latitude + "," + position.coords.longitude;

    var img_url = "http://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=14&size=400x300&sensor=false";
    document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}
$('.location').click(function(event){

event.stopPropagation();
$( "#mapholder" ).toggle();

        navigator.geolocation.getCurrentPosition(showPosition, showError);
   
})

	
$.ajax({
    type: 'POST',
    dataType:'json',
     url: 'http://localhost/ionic/myApp/www/js/response.json',
	//url: 'https://agile-brook-5237.herokuapp.com/',
    
    success: function(responseData) {
    var textToDisplay = "";
	for (var key in responseData) {
	
		var tweetCount = 0;
		var sender = responseData[key]["sender"]["screen_name"];
		if (sender == 'ankurkumar78'){
			var currentTweetText = "";
			var tweetText = responseData[key]["text"];
			alert("aa");
			var  tweetTextArray = tweetText.split("|");
			if (tweetTextArray.length == 4){
				currentTweetText = "User:"+tweetTextArray[0]+"<br/>Policy Number:"+tweetTextArray[1]+"<br/>Location:"+tweetTextArray[2]+"<br/>Impact Time:"+tweetTextArray[3];
				textToDisplay=textToDisplay +"<br/>" +currentTweetText;
				tweetCount++;
				if (tweetCount == 5){
					break;
				}
			}
		
		}
	}
	console.log(textToDisplay);
    
},
    error: function(XMLHttpRequest, textStatus, errorThrown) {
        //TODO  
    }
});




