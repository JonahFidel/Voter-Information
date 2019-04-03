// zip code input
var input = document.getElementById("zipCode");
var button = document.getElementById("loadRepInfo");

button.addEventListener("click", function(){
	if(validateZipCode(input.value)){
		loadClient();
	} else {
		alert("Invalid Zip Code, please try again.")
	}
});

// execute on 'enter'
input.addEventListener("keyup", function(event) {
	// Number 13 is the "Enter" key on the keyboard
	if (event.keyCode === 13) {
		// Trigger the button element with a click
		document.getElementById("loadRepInfo").click();
	}
});


function badZipCode() {
	if(!!document.getElementById('errorMsg')){
		document.body.removeChild(document.getElementById('errorMsg'));
	}
	const item = document.createElement('div');
	item.id = 'errorMsg';
	item.textContent = "Please enter a valid zip code.";
	item.classList.add("error");
	document.body.appendChild(item);
}

function validateZipCode(elementValue){
    var zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;
     return zipCodePattern.test(elementValue);
}


function loadClient() {

	var address = document.getElementById('zipCode').value;

	fetch('https://www.googleapis.com/civicinfo/v2/representatives?address=' + address + '&key=' + config.apiKey)
	.then(response => response.json())
	.then(function(data) {
		// clear bad zip code error message
		if(!!document.getElementById('errorMsg')){
			document.body.removeChild(document.getElementById('errorMsg'));
		}

		// clear page on new search
		if (!!document.getElementById('blockElement')){
			document.body.removeChild(document.getElementById('blockElement'));
		}

		// grab town name
		const townName = document.createElement('div');
		townName.id = 'townName';
		townName.innerText = data.normalizedInput.city + ', ' + data.normalizedInput.state + '\n';

		// the main page: town name and content together
		const blockElement = document.createElement('div');
		blockElement.id = 'blockElement';
		document.body.appendChild(blockElement);

		// the content
		const contentElement = document.createElement('div');
		contentElement.id = 'contentElement';

		// create the page
		document.getElementById('blockElement').appendChild(townName);
		document.getElementById('blockElement').appendChild(contentElement);

		// to keep track of items
		var count = 0;

		for (var i = 0; i < data.offices.length; i++){
			for (var j = 0; j < data.offices[i].officialIndices.length; j++){

				// allows for column responsiveness
				document.getElementById('contentElement').classList.add('row');	

				// single card item
				const item = document.createElement('div');
				item.id = 'listItem' + count;
				document.getElementById('contentElement').appendChild(item);

				// office
				const office = document.createElement('strong');
				office.id = 'office';
				office.innerText = data.offices[i].name + ': ';

				// official
				const official = document.createElement('div');
				official.id = 'official';	
				official.innerText = data.officials[data.offices[i].officialIndices[j]].name + ', ' + data.officials[data.offices[i].officialIndices[j]].party;

				// create the image
				const officialImage = document.createElement('img');
				officialImage.id = 'officialImage';
				if (!!data.officials[data.offices[i].officialIndices[j]].photoUrl){
					officialImage.src = data.officials[data.offices[i].officialIndices[j]].photoUrl;
				}
				officialImage.height = 130;
				officialImage.width = 100;

				// add UI elements to the page
				document.getElementById('listItem' + count).appendChild(office);
				document.getElementById('listItem' + count).appendChild(official);
				if (!!officialImage.src){
					document.getElementById('listItem' + count).appendChild(officialImage);
				}

				// configure page UI elements into responsive columns
				var itemRef = document.getElementById('listItem' + count);
				itemRef.classList.add('col-sm-6');
				itemRef.classList.add('col-md-4');
				itemRef.classList.add('col-lg-3');

				count++;
			}
		}	
	}).catch(error => badZipCode());
}

