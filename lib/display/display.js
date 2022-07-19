const tracks = {
	id: ["A", "B"],
	description: ["Filz", "Miniaturgolf"]
};

const groupsinfo = {
	type: ["next", "current"],
	description: ["Nächste Gruppe", "Aktuelle Gruppe"],
	offset: [1, 0]
};



let buildgroupinformation = async() => {

	//get displaypage main content container
	let maingroupcontainer = document.getElementById("maingroupcontainer");

	//create new document fragment
	let docfrag = document.createDocumentFragment();

	for(let i = 0; i < tracks["id"].length; i++){
		
		//get track description
		let trackdescriptiondb = await(gettrackdescription(tracks["id"][i]));
		trackdescriptiondb = trackdescriptiondb["trackdescription"];

		//create main container for track
		let maintrackcontainer = document.createElement("div");
		maintrackcontainer.classList.add("maintrackcontainer");
		docfrag.appendChild(maintrackcontainer);

		//container for track headline and description
		let trackheadlinecontainer = document.createElement("div");
		trackheadlinecontainer.classList.add("trackheadline");
		maintrackcontainer.appendChild(trackheadlinecontainer);

		//create track description
		let trackdescription = document.createElement("div");
		trackdescription.classList.add("flex");
		trackdescription.classList.add("trackdescription");
		trackdescription.innerText = trackdescriptiondb;
		trackheadlinecontainer.appendChild(trackdescription);
		
		//offset for database call of players
		let offset = 1;
		
		//create elements for next and current groups
		for(let j = 0; j < 2; j++){
			//create group container
			let groupcontainer = document.createElement("div");
			groupcontainer.classList.add("groupcontainer");
			maintrackcontainer.appendChild(groupcontainer);

			//container fro headline of next/currentgroup
			let groupheadlinecontainer = document.createElement("div");
			groupheadlinecontainer.classList.add("groupheadlinecontainer");
			if(groupsinfo["offset"][j] == 1){
				groupheadlinecontainer.classList.add("nextgroup");
			}else if(groupsinfo["offset"][j] == 0){
				groupheadlinecontainer.classList.add("currentgroup");
			}
			groupcontainer.appendChild(groupheadlinecontainer);

			//descript next/current group
			let grouptype = document.createElement("div");
			grouptype.classList.add("flex");
			grouptype.innerText = groupsinfo["description"][j];
			groupheadlinecontainer.appendChild(grouptype);

			//number of next/current group
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
			groupcontainer.appendChild(mainplayerscontanier);
			
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
			playersurname.classList.add("verticalcenter");
			playersurname.innerText = players[i]["surname"]
			individualplayercontainer.appendChild(playersurname);
	
			let playerfirstname = document.createElement("div");
			playerfirstname.classList.add("verticalcenter");
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
		
		//check if the group on display is the same as on the db
		if(groupondb != groupondisplay){

			//loop through tracks
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
		}
	}
}

let buildheader = () => {

	
	
	
	let headerdiv = document.getElementById("header");
	
	let logoscontainer = creatediv({
		appendto: headerdiv,
		divid: "logoscontainer",
	});
	
	let currentlogogroup = sessionStorage.getItem("logogroup");

	let i, j;

	switch(currentlogogroup){
		case "1":
			i = 4;
			j = 7;
			sessionStorage.setItem("logogroup", 2);
			break;
		case "2":
			i = 0;
			j = 3;
			sessionStorage.setItem("logogroup", 1);
			break;
	}	

	let pathlogos = {
		0: "/mcs/dev/sponsors/3d.jpg",
		1: "/mcs/dev/sponsors/allianz.jpg",
		2: "/mcs/dev/sponsors/allianz.jpg",
		3: "/mcs/dev/sponsors/knopf.jpg",
		4: "/mcs/dev/sponsors/knopf.jpg",
		5: "/mcs/dev/sponsors/knopf.jpg",
		6: "/mcs/dev/sponsors/funsports.jpg",
		7: "/mcs/dev/sponsors/funsports.jpg"
	};

	let numberoflogos = (Object.keys(pathlogos).length);


	while(i <= j){
		if(i == numberoflogos){
			break;
		}
		
		let logodiv = creatediv({
			appendto: logoscontainer,
			divclass: ["flex"]
		});
			
			
		let logo = document.createElement("img");
		logo.setAttribute("src", pathlogos[i]);
		logo.classList.add("logos");
		logodiv.appendChild(logo);
		
		i++;
		
	}

}

let setinitiallogogroup = () => {
	sessionStorage.setItem("logogroup", 1);
}

document.addEventListener("DOMContentLoaded", function(){
    setInterval(function(){
		refreshgroups();
    }, 5000)
});


DOMready(setinitiallogogroup);
DOMready(buildgroupinformation);
DOMready(buildheader);