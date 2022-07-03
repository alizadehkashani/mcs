const tracks = {
	id: ["A", "B"],
	description: ["Filz", "Miniaturgolf"]
};

const groupsinfo = {
	type: ["next", "current"],
	description: ["Nächste Gruppe", "Aktuelle Gruppe"],
	offset: [1, 0]
};

let buildgroupinformation = () => {

	//console.log(tracks);

	//get displaypage main content container
	let maingroupcontainer = document.getElementById("maingroupcontainer");

	//create new document fragment
	let docfrag = document.createDocumentFragment();

	for(let i = 0; i < tracks["id"].length; i++){
		
		//create main container for track
		let maintrackcontainer = document.createElement("div");
		maintrackcontainer.classList.add("maintrackcontainer");
		docfrag.appendChild(maintrackcontainer);

		//container for track headline and description
		let trackheadlinecontainer = document.createElement("div");
		trackheadlinecontainer.classList.add("trackheadline");
		maintrackcontainer.appendChild(trackheadlinecontainer);

		//create track id
		let trackid = document.createElement("div");
		trackid.classList.add("flex");
		trackid.innerText = "Anlage " + tracks["id"][i];
		trackheadlinecontainer.appendChild(trackid);

		//create track description
		let trackdescription = document.createElement("div");
		trackdescription.classList.add("flex");
		trackdescription.innerText = tracks["description"][i];
		trackheadlinecontainer.appendChild(trackdescription);

		//offset for database call of players
		let offset = 1;
		
		//create elements for next and current groups
		for(let j = 0; j < 2; j++){
			let groupheadlinecontainer = document.createElement("div");
			groupheadlinecontainer.classList.add("groupheadlinecontainer");
			maintrackcontainer.appendChild(groupheadlinecontainer);

			let grouptype = document.createElement("div");
			grouptype.classList.add("flex");
			grouptype.innerText = groupsinfo["description"][j];
			groupheadlinecontainer.appendChild(grouptype);

			let groupnumber = document.createElement("div");
			let groupnumberid = "number"+ tracks["id"][i] + groupsinfo["type"][j];
			groupnumber.setAttribute("id", groupnumberid);
			groupnumber.classList.add("flex");
			groupnumber.innerText = "-";
			groupheadlinecontainer.appendChild(groupnumber);

			let mainplayerscontanier = document.createElement("div");
			mainplayerscontanier.classList.add("mainplayerscontainer");
			let mainplayerscontainerid = "players"+ tracks["id"][i] + groupsinfo["type"][j];
			mainplayerscontanier.setAttribute("id", mainplayerscontainerid)
			maintrackcontainer.appendChild(mainplayerscontanier);
			
			maingroupcontainer.appendChild(docfrag);
			
			buildplayers(tracks["id"][i], groupnumberid, mainplayerscontainerid, groupsinfo["offset"][j]);
		}

	}

}

let buildplayers = async (track, numbercontainerid, playercontainerid, offset) => {
	
	//get dom elements via element id
	let numbercontainer = document.getElementById(numbercontainerid);
	let playercontainer = document.getElementById(playercontainerid);

	//get players from database
	let players = await(ajaxCallPromise({
		url: "lib/administration/getplayeroffset.php",
		method: "POST",
		data: {track: track, offset: offset}
	}));
	
	//if database gives result
	if(players.length != 0){
		
		if(offset == 0){
			sessionStorage.setItem("displaygrouptrack" + track, players[0]["startorder"]);
		}

		//set group number
		groupnumber = players[0]["startgroup"];
		numbercontainer.innerText = groupnumber;

		//create players per group
		for(let i = 0; i < players.length; i++){
			let individualplayercontainer = document.createElement("div");
			individualplayercontainer.classList.add("individualplayer");
			playercontainer.appendChild(individualplayercontainer);
		
			let playernumber = document.createElement("div");
			playernumber.classList.add("flex");
			playernumber.innerText = players[i]["playernumber"]
			individualplayercontainer.appendChild(playernumber);
	
			let playersurname = document.createElement("div");
			playersurname.classList.add("flex");
			playersurname.innerText = players[i]["surname"]
			individualplayercontainer.appendChild(playersurname);
	
			let playerfirstname = document.createElement("div");
			playerfirstname.classList.add("flex");
			playerfirstname.innerText = players[i]["firstname"]
			individualplayercontainer.appendChild(playerfirstname);
		}
	}else{
		numbercontainer.innerText = "-";
	}


}

let refreshgroups = async () => {
	
	//loop for each track
	for(m = 0; m < 2; m++){
		
		let currentgroup = await(ajaxCallPromise({
			url: "lib/display/getcurrentstartorder.php",
			method: "POST",
			data: {trackid: tracks["id"][m]}
		}));

		

		let groupondb = currentgroup["currentgroup"];
		let groupondisplay = sessionStorage.getItem("displaygrouptrack" + tracks["id"][m]); 
		
		//console.log("track " + tracks["id"][m] + " " + groupondisplay + " on display");
		//console.log("track " + tracks["id"][m] + " " + groupondb + " on db");
		//console.log(groupondb, groupondisplay);

		if(groupondb != groupondisplay){

			console.log("different groups");

			for(n = 0; n < 2; n++){
				
				//div id of number container
				let numbercontainerid = "number" + tracks["id"][m] + groupsinfo["type"][n];
				
				//div id of players container
				let playercontainerid = "players" + tracks["id"][m] + groupsinfo["type"][n];
	
				//clear existing divs
				clearNode(numbercontainerid);
				clearNode(playercontainerid);
	
				buildplayers(tracks["id"][m], numbercontainerid, playercontainerid, groupsinfo["offset"][n]);
	
			}
		}else{
			console.log("samegroups");
		}
	}
}



document.addEventListener("DOMContentLoaded", function(){
    setInterval(function(){
		refreshgroups();
    }, 5000)
});


DOMready(buildgroupinformation);