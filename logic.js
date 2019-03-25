
// loadVoterInfoButton.onclick = function inputChange(e) {
// 	console.log('Loading...');

//   // Practical example
//   fetch('https://www.googleapis.com/civicinfo/v2/elections?key=' + config.apiKey)
//   .then(response => response.json())
//   .then(data => console.log(JSON.stringify(data)))
// }

// zip code input
var input = document.getElementById("zipCode");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("bigLoadButton").click();
  }
});


  /**
   * Sample JavaScript code for civicinfo.representatives.representativeInfoByAddress
   * See instructions for running APIs Explorer code samples locally:
   * https://developers.google.com/explorer-help/guides/code_samples#javascript
   */

   function loadClient() {
   	// gapi.client.setApiKey(config.apiKey);
   	// return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/civicinfo/v2/rest")
   	// .then(function() { console.log("GAPI client loaded for API"); },
   	// 	function(err) { console.error("Error loading GAPI client for API", err); });

   		var address = document.getElementById('zipCode').value;

	   	// Practical example
	   	fetch('https://www.googleapis.com/civicinfo/v2/representatives?address=' + address + '&key=' + config.apiKey)
	   	.then(response => response.json())
	   	// .then(data => console.log(JSON.stringify(data)))
	   	.then(function(data) {
	   		const newElement = document.createElement('div')
			document.body.appendChild(newElement)
			newElement.innerText = /*JSON.stringify(*/data.normalizedInput.city/*)*/;
	  })
}


  // // Make sure the client is loaded before calling this method.
  // function execute() {
  // 	return gapi.client.civicinfo.representatives.representativeInfoByAddress({
  // 		"address": "03062",
  // 		"includeOffices": true,
  // 		"levels": [
  // 		"country"
  // 		]
  // 	})
  // 	.then(function(response) {
  //               // Handle the results here (response.result has the parsed body).
  //               console.log("Response", response);
  //           },
  //           function(err) { console.error("Execute error", err); });
  // }
  // gapi.load("client");


