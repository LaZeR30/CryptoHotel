$(document).ready(function() {

var results; // GLOBAL

var oObject = {

	queryAPI: function(destination, checkInDate, checkOutDate) {
		console.log("destination=", destination, "checkInDate=", checkInDate, "checkOutDate=", checkOutDate, "cryptoCurrency=", cryptoCurrency) ;
		var queryURL = "" ;  var imgImage = "" ; 
		//queryURL = "https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?apikey=KWw4deQOBwupthpTERpSeGgc00c4qt3I&location=LAX&check_in=2018-12-15&check_out=2018-12-16&all_rooms=true" ;
		queryURL = "https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?apikey=KWw4deQOBwupthpTERpSeGgc00c4qt3I&location=" +
					destination + "&check_in=" + checkInDate + "&check_out=" + checkOutDate + "&number_of_results=11" ;
		console.log("queryURL=", queryURL) ;

		$.ajax({	
			url: queryURL,
			method: "GET"
			}) .then(function(response) {
		 			results = response.results ;	// results is GLOBAL
					console.log("INSIDE queryAPI > AJAX > response1-RESULTS1= ", results) ;
					oObject.addHotelRows() ;
				}); // end .then
				
	} ,  // end queryAPI

	addHotelRows: function() {
		var numResults = results.length ; 
		var iLoopIndex = 0 ;  var iCounter = 0; 
		if (numResults > 8) { iLoopIndex = 8; } else {iLoopIndex = numResults; } ; 
		//console.log("INSIDE addHotelRows > numResults=", numResults, "iLoopIndex=", iCounter) ;

		$("#trainBody").empty() ; 
		
		//for (iCounter=0; iCounter < 4; iCounter++ )
		for (iCounter=0; iCounter < iLoopIndex; iCounter++ )
		{
			var newRow = $("<tr>").append(
				$("<td>").text(results[iCounter].property_name),
				$("<td>").text(results[iCounter].address.line1),
				$("<td>").text(results[iCounter].amenities[0].description),
				$("<td>").text(results[iCounter].total_price.amount)
			);
			// Append new row to table
			$("#trainTable > tbody").append(newRow); 
		}
		//console.log("EXIT addNewRow") ;
	} , // end addHotelRows
} ; // end oObject

// START
$(document).on('click','.btn',function(event) { // $(".btn-sm").on("click", function() {} DOES NOT WORK FOR NEW DYNAMIC BUTTONS
	event.preventDefault();
	var destination = $("#destination").val().trim();
	var checkInDate = $("#checkInDate").val().trim();
	var checkOutDate = $("#checkOutDate").val().trim();
	var cryptoCurrency = $("#cryptoCurrency").val().trim();
	oObject.queryAPI(destination, checkInDate, checkOutDate) ;
	console.log("this is AFTER queryAPI > response2-RESULTS2= ", results) ;
  });

}); // end doc ready

