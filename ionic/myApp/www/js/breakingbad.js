
/*$("#notification-tab").click(function(){
$( "#app-tabs" ).toggle();

});*/


/*$('.userid').click(function(){
$(this).next(".useridDetails ").toggle();
})*/
var x = document.getElementById("demo");
var latestkey = 0;

function showPosition(position) {
    var latlon = 28.47468 + "," + 77.10490;
	alert(latlon);
	
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
		alert(showPosition);
})



function ajaxcall(){
$.ajax({
    type: 'POST',
    dataType:'json',
     url: 'http://localhost/ionic/myApp/www/js/response.json',
	//url: 'https://agile-brook-5237.herokuapp.com/',
    
    success: function(responseData) {
    var textToDisplay = "";
	var htmlStr="";
	var tweetCount = 0;
	for (var key in responseData) {
		
		$(".item-body").html("");
		var sender = responseData[key]["sender"]["screen_name"];
		
		if (sender == 'ankurkumar78'){
			
			var currentTweetText = "";
			var tweetText = responseData[key]["text"];
			var  tweetTextArray = tweetText.split("|");
			
			if (tweetTextArray.length == 4){
				
				currentTweetText = "User:"+tweetTextArray[0]+"<br/>Policy Number:"+tweetTextArray[1]+"<br/>Location:"+tweetTextArray[2]+"<br/>Impact Time:"+tweetTextArray[3];
				textToDisplay=textToDisplay +"<br/>" +currentTweetText;
				tweetCount++;
				if (tweetCount == 5){
					break;
				}
				htmlStr = htmlStr+'<div id="userInfo-'+key+'" class="userInfo"><span>Incident Reported</span>';
				htmlStr = htmlStr+'<span class="policyInfoDetails">Policy Number : <cite class="policyInfo"><a class="useridInfo"  href="#/tab/facts2">'+tweetTextArray[1]+'</a></cite></span><br/>';
				htmlStr = htmlStr+'<span class="datetimeDetails">Date/Time : <cite class="datetimeInfo">'+tweetTextArray[3]+'</cite></span><br/>';
				htmlStr = htmlStr+'<cite class="locatioInfo">Location: <a href="http://maps.google.com/?q='+tweetTextArray[2]+'" class="location">View On Map</a></cite><div id="mapholder"></div></div>';
				
				
				
				
				//$(".useridInfo").text(tweetTextArray[0]);
				
						
				
				
				
				//$('<span>Impact detected at : <cite class="locationDetect">'+tweetTextArray[2]+'</cite></span>').insertAfter('.useridDetails');
				//$('.useridDetails ').insertAfter()
				//$(".locationDetect").each(function(){
				//$(this).text(tweetTextArray[2]);
				//})
				//$(".locationDetect").text(tweetTextArray[2]);
			}
		
		}
	}
	
	$(".item-body").append(htmlStr);
	$("#note-count").text($(".userInfo").length)
	console.log(textToDisplay);
    
},
    error: function(XMLHttpRequest, textStatus, errorThrown) {
        //TODO  
    }
});
}
ajaxcall();
setInterval(function(){ 
ajaxcall();
}, 60000);	
if($(".userInfo").length == 0) {
$(".item-body").html('<div id="userInfo" class="userInfo"><span>No Notification to View</span>');
}




