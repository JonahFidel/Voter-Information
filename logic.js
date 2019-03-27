
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

	var address = document.getElementById('zipCode').value;

	fetch('https://www.googleapis.com/civicinfo/v2/representatives?address=' + address + '&key=' + config.apiKey)
	.then(response => response.json())
	.then(function(data) {
		if (!!document.getElementById('blockElement')){
			document.body.removeChild(document.getElementById('blockElement'));
		}
		const townName = document.createElement('div');
		townName.id = 'townName';
		townName.innerText = data.normalizedInput.city + ', ' + data.normalizedInput.state + '\n';
		const blockElement = document.createElement('div');
		blockElement.id = 'blockElement';
		document.body.appendChild(blockElement);
		const colElement = document.createElement('div');
		colElement.id = 'colElement';
		document.getElementById('blockElement').appendChild(townName);
		document.getElementById('blockElement').appendChild(colElement);
		var count = 0;

		for (var i = 0; i < data.offices.length; i++){
			for (var j = 0; j < data.offices[i].officialIndices.length; j++){
				document.getElementById('colElement').classList.add('row');	
				const item = document.createElement('div');
				item.id = 'item' + count;
				document.getElementById('colElement').appendChild(item);
				const office = document.createElement('strong');
				office.id = 'office';
				office.innerText = data.offices[i].name + ': ';
				const official = document.createElement('div');
				official.id = 'official';	
				official.innerText = data.officials[data.offices[i].officialIndices[j]].name + ', ' + data.officials[data.offices[i].officialIndices[j]].party;
				const officialImage = document.createElement('img');
				officialImage.id = 'officialImage';
				if (!!data.officials[data.offices[i].officialIndices[j]].photoUrl){
					officialImage.src = data.officials[data.offices[i].officialIndices[j]].photoUrl;
				}
				officialImage.height = 130;
				officialImage.width = 100;
				document.getElementById('item' + count).appendChild(office);
				document.getElementById('item' + count).appendChild(official);
				if (!!officialImage.src){
					document.getElementById('item' + count).appendChild(officialImage);
				}
				var itemRef = document.getElementById('item' + count);
				itemRef.classList.add('col-sm-6');
				itemRef.classList.add('col-md-4');
				itemRef.classList.add('col-lg-3');
				count++;
			}
		}	
	})
}


