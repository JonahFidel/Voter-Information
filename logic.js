
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


function loadClient() {

	if (!!document.getElementById('blockElement')){
		document.body.removeChild(document.getElementById('blockElement'));
	}

	var address = document.getElementById('zipCode').value;

	fetch('https://www.googleapis.com/civicinfo/v2/representatives?address=' + address + '&key=' + config.apiKey)
	.then(response => response.json())
	.then(function(data) {
		const townName = document.createElement('div');
		townName.id = 'townName';
		townName.innerText = data.normalizedInput.city + ', ' + data.normalizedInput.state + '\n';
		const blockElement = document.createElement('div');
		blockElement.id = 'blockElement';
		document.body.appendChild(blockElement);
		document.getElementById('blockElement').appendChild(townName);
		for (var i = 0; i < data.offices.length; i++){
			for (var j = 0; j < data.offices[i].officialIndices.length; j++){
				const office = document.createElement('strong');
				office.id = 'office';
				office.innerText = data.offices[i].name + ': ';
				const official = document.createElement('div');
				official.id = 'official';	
				official.innerText = data.officials[data.offices[i].officialIndices[j]].name + ', ' + data.officials[data.offices[i].officialIndices[j]].party;
				document.getElementById('blockElement').appendChild(office);
				document.getElementById('blockElement').appendChild(official);
			}
		}	
	})
}


