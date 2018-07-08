$(document).ready(function() {
	
	// GLOBAL
	var results; var bitPrice=[];

	var oObject = {

		convertCrypto: function() {

			$.ajax({	
				url: "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD,EUR",
				method: "GET"
				}) 
				.then(function(response) {
						
					for (var i=0; i < results.length; i++ )
					{
						var USD = results[i].total_price.amount ;
						bitPrice[i] = (USD / response.BTC.USD).toFixed(7) ;
						//console.log("INSIDE convertCrypto > USD[i]=", results[i].total_price.amount, "bitPrice=", bitPrice[i]) ;
					}
				//console.log("INSIDE convertCrypto > bitPrice=", bitPrice) ;
				
				})	// end then 
		} , // end convertCrypto

		addHotelRows: function() {
			var numResults = results.length ; 
			var iLoopIndex = 0 ;  var iCounter = 0; 
			if (numResults > 8) { iLoopIndex = 8; } else {iLoopIndex = numResults; } ; 
			
			$("#hotelBody").empty() ; 
	
			//console.log("INSIDE addHotelRows > bitPrice=", bitPrice) ;

			//for (iCounter=0; iCounter < 3; iCounter++ )
			for (iCounter=0; iCounter < iLoopIndex; iCounter++ )
			{
				var newRow = $("<tr>").append(
					$("<td>").text(results[iCounter].property_name),
					$("<td>").text(results[iCounter].address.line1),
					$("<td>").text(results[iCounter].amenities[0].description),
					$("<td>").text(results[iCounter].total_price.amount),
					$("<td>").text(bitPrice[iCounter])
				);
				// Append new row to table
				$("#hotelTable > tbody").append(newRow); 
			}
			//console.log("EXIT addNewRow") ;
		} , // end addHotelRows
	
		queryHotels: function(destination, checkInDate, checkOutDate, cryptoCurrency) {
			//console.log("INSIDE queryAPI destination=", destination, "checkInDate=", checkInDate, "checkOutDate=", checkOutDate, "cryptoCurrency=", cryptoCurrency) ;
			var queryURL = "" ;  

			queryURL = "https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?apikey=KWw4deQOBwupthpTERpSeGgc00c4qt3I&location=" +
						destination + "&check_in=" + checkInDate + "&check_out=" + checkOutDate + "&number_of_results=11" ;
			//console.log("queryURL=", queryURL) ;

			$.ajax({	
				url: queryURL,
				method: "GET"
				}) .then(function(response) {
						results = response.results ;	// results is GLOBAL
						console.log("INSIDE queryHotels > AJAX > response1-RESULTS1= ", results, "resultsLength=", results.length ) ;
						
						oObject.convertCrypto();
						oObject.addHotelRows() ;

					}); // end .then	

		} ,  // end queryHotels

} ; // end oObject

// START
$(document).on('click','.btn',function(event) { // $(".btn").on("click", function() {} DOES NOT WORK FOR NEW DYNAMIC BUTTONS
	event.preventDefault();
	var destination = $("#destination").val().trim();
	var checkInDate = $("#checkInDate").val().trim();
	var checkOutDate = $("#checkOutDate").val().trim();
	var cryptoCurrency = $("#cryptoCurrency").val().trim();
	oObject.queryHotels(destination, checkInDate, checkOutDate, cryptoCurrency) ;
	console.log("this is AFTER queryAPI > response2-RESULTS2= ", results) ;
}); // end $(document).on('click' 

// following line should NOT be necessary - it's here because bitPrice does not display without 2nd click
	$(".btn").click();

}); // end doc ready

