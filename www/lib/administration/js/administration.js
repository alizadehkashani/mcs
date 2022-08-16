let addEventListeners = () => {

}

//create header for main container
let buildheader = () => {

	//get main container
	let administrationcontainer = document.getElementById("administration");

	//create new container for headline text
	let headercontainer = creatediv({
		divid: "headcontainer",
		appendto: administrationcontainer
	})

	//create new div and set text
	creatediv({
		divid: "mcstext",
		appendto: headercontainer,
		divtext: "MCS"
	})
}

//triggers creation for main navigation
let buildnavigation = () => {
	
	//get main administration container
	let administrationcontainer = document.getElementById("administration");
	
	//create new container for navigation
	let navigationcontainer = creatediv({
		divid: "navigationcontainer",
		appendto: administrationcontainer
	})

	//trigger creation of variable navigation and constant navigation
	buildvariablenavigation(navigationcontainer);
	buildconstantnavigation(navigationcontainer);

}

//builds the upper part of the navigation
let buildvariablenavigation = async (maincontainer) => {
	
	//create the container and append to the main container
	let navigationvariablecontainer = creatediv({
		divid: "navigationvariablecontainer",
		appendto: maincontainer
	})

	//get the tournaments from the database
	let tournaments = await gettournaments();

	//create a new row for each tournament
	for(let i = 0; i < tournaments.length; i++){

		//create container for tournament
		let tournament = creatediv({
			divclass: ["navigationitem-0", "navigationhover"],
			appendto: navigationvariablecontainer
		})
				
		//create container for expand/collapse control
		let expandcontainer = creatediv({
			appendto: tournament
		})
		expandcontainer.style.height = "20px";
		expandcontainer.style.width = "20px";
		expandcontainer.setAttribute("data-state", "collapsed");
		
		//create svg for expand/collapse control
		let polygonsvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		polygonsvg.setAttribute("viewBox", "0 0 20 20");
		polygonsvg.setAttribute("height", "20px");
		polygonsvg.setAttribute("width", "20px");
		expandcontainer.appendChild(polygonsvg);

		//create new triangle
		let polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
		polygon.setAttribute("points", "8,5 13,10 8,15");
		polygon.setAttribute("fill", "#5f6368");	
		polygonsvg.appendChild(polygon);
		
		//add event listener for expand/collapse control
		polygonsvg.addEventListener("click", () => {
			expandcollapseicon(expandcontainer, polygon)
		})

		// add tournament description icon container
		let tournamenticonanddescription = creatediv({
			divclass: ["navigation-icon-description", "navigationitemhover"],
			appendto: tournament
		})

		//add event lisnter if tournmant is selected
		tournamenticonanddescription.addEventListener("click", () => {
			setselectednavigation(tournament);
			buildtournament(tournaments[i]["id"]);
		})

		//add icon to tournament
		let tournamenticon = document.createElement("img");
		tournamenticon.setAttribute("src", "lib/administration/assets/tournament.svg");
		tournamenticon.classList.add("navigationicon");
		tournamenticonanddescription.appendChild(tournamenticon);

		//add tournament name
		creatediv({
			divtext: tournaments[i]["description"],
			divclass: ["flexleft", "navigationdescription"],
			appendto: tournamenticonanddescription
		})

	}

	//add create tournament
	let createtournamentcontainer = creatediv({
		divclass: ["navigationitem-0", "navigationhover"],
		appendto: navigationvariablecontainer
	})

	//empty div instead of expand arrow
	creatediv({appendto: createtournamentcontainer});

	//container for icon and description
	let createtournamenticonanddescriptioncontainer = creatediv({
		divclass: ["navigation-icon-description", "navigationitemhover"],
		appendto: createtournamentcontainer
	})

	createtournamenticonanddescriptioncontainer.addEventListener("click", () => {
		if(iscurrentlyselected(createtournamentcontainer)){return;}
		
		setselectednavigation(createtournamentcontainer);
		buildworkspacecreatetournament(createtournamentcontainer);
		
	})

	//icon for create new tournament
	let createtournamenticon = document.createElement("img");
	createtournamenticon.setAttribute("src", "lib/administration/assets/createtournament.svg");
	createtournamenticon.classList.add("navigationicon");
	createtournamenticonanddescriptioncontainer.appendChild(createtournamenticon);

	//text for create new tournament
	creatediv({
		divtext: "Neu",
		divclass: ["flexleft", "navigationdescription"],
		appendto: createtournamenticonanddescriptioncontainer
	})

}

//changes the triangle if item is expanded/collapsed
let expandcollapseicon = (container, polygon) => {

	//get state from container
	let state = container.getAttribute("data-state");
	
	//set new triangle accordingly
	if(state == "collapsed"){
		container.setAttribute("data-state", "expanded")
		polygon.setAttribute("points", "5,8 10,13 15,8");

	}else{
		container.setAttribute("data-state", "collapsed")
		polygon.setAttribute("points", "8,5 13,10 8,15");
	}
	
}

//get tournaments from database
let gettournaments = async () => {
	let response = await fetch("/lib/administration/php/gettournaments.php");

	let tournaments = await response.json();

	return tournaments;
}

let gettournament = async (tournmanetid) => {
	let requestdata = {tournmanetid: tournmanetid};

	let reponse = await fetch("/lib/administration/php/gettournament.php", {
		method: 'POST',
		headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		body: JSON.stringify(requestdata)
	});

	let phpresponse = await reponse.json();

	return phpresponse;
}

let buildconstantnavigation = (maincontainer) => {
	
	//create container for constant navigation
	let navigationconstantcontainer = creatediv({
		divid: "navigationconstantcontainer",
		appendto: maincontainer,
	})

	//container for settings
	let settingscontainer = creatediv({
		divclass: ["navigationitem-0", "navigationitemhover"],
		appendto: navigationconstantcontainer
	})

	creatediv({appendto: settingscontainer});

	//container for icon and description
	let sesstingsiconanddescription = creatediv({
		divclass: ["navigation-icon-description"],
		appendto: settingscontainer
	})

	sesstingsiconanddescription.addEventListener("click", () =>{
		setselectednavigation(settingscontainer);
		buildsettings;
	})

	let settingsicon = document.createElement("img");
	settingsicon.setAttribute("src", "lib/administration/assets/settings.svg");
	settingsicon.classList.add("navigationicon");
	sesstingsiconanddescription.appendChild(settingsicon);

	creatediv({
		appendto: sesstingsiconanddescription,
		divclass: ["flexleft", "navigationdescription"],
		divtext: "Einstellungen"
	})
}

let buildsettings = () => {

}

let buildworkspace = () => {
	//create workspace container
	let workspace = creatediv({
		appendto: document.getElementById("administration"),
		divid: ["administrationworkspace"] 
	})

	//create worspace head container
	let workspacehead = creatediv({
		appendto: workspace,
		divid: "administrationworkspacehead"
	})

	//create container for variable head
	creatediv({
		appendto: workspacehead,
		divid: "administrationworkspacevariablehead"
	})

	//create container for close button
	let closebuttoncontainer = creatediv({
		appendto: workspacehead,
		divid: "administrationworkspaceclosebuttoncontainer"
	})

	//add close button
	let closeicon = document.createElement("img");
	closeicon.setAttribute("src", "lib/assets/close.svg");
	closeicon.classList.add("workspaceicon");
	closebuttoncontainer.appendChild(closeicon);

	//add eventlistner to close button
	closebuttoncontainer.addEventListener("click", () =>{
		setinvisivble(workspace);
		deselectallnavigation();
	})

	//create body
	creatediv({
		appendto: workspace,
		divid: "administrationworkspacebody"
	})
	
	//creat foot
	creatediv({
		appendto: workspace,
		divid: "administrationworkspacefoot"
	})
}


//returns dom element of workspace
let getworkspace = () => {
	let workspace = document.getElementById("administrationworkspace");
	return workspace;
}

//returns dom element of workspacebody
let getworkspacebody = () => {
	let workspacebody = document.getElementById("administrationworkspacebody");
	return workspacebody;
}

//returns dom element of workspacefoot
let getworkspacefoot = () => {
	let workspacefoot = document.getElementById("administrationworkspacefoot");
	return workspacefoot
}

//clears variable content of workspace
let clearworkspace = () => {
	//clear variable header and body
	clearid("administrationworkspacevariablehead");
	clearid("administrationworkspacebody");
	clearid("administrationworkspacefoot");


	//remove classes from workspacebody
	document.getElementById("administrationworkspacebody").className = "";
}

let setselectednavigation = (div) => {

	deselectallnavigation();
	
	div.classList.remove("navigationhover");
	div.classList.add("selectednavigation");

}

let deselectallnavigation = () => {
	let currentselected = document.querySelector(".selectednavigation");

	if(currentselected != null){
		currentselected.classList.remove("selectednavigation");
		currentselected.classList.add("navigationhover");
	}
}

let iscurrentlyselected = (div) => {
	
	let currentselected = document.querySelector(".selectednavigation");
	
	if(currentselected == null){return false}
	
	if(currentselected.isEqualNode(div)){
		return true;
	}else{
		return false;
	}
}

let buildworkspacecreatetournament = (clickeddiv) => {
	
	//get elements for workspace and workspace body
	let workspace = getworkspace();
	let workspacebody = getworkspacebody();
	let workspacefoot = getworkspacefoot();

	//clear workspace
	clearworkspace();
	
	//set workspace width
	workspace.style.width = "600px";

	//set new workspacebody class
	workspacebody.classList.add("workspacecreatetournament");
	
	//make workspace visible
	setdivisible(workspace, "grid");
	
	
	//div for description off tournmanet description button
	creatediv({
		appendto: workspacebody,
		divtext: "Beschreibung"
	})

	//input for tournament description
	let tournamentdescriptioninput = creatediv({
		type: "INPUT",
		appendto: workspacebody
	})

	//description for tournament location input
	creatediv({
		appendto: workspacebody,
		divtext: "Austragungsort"
	})

	//input for tournamentlocationinput
	let tournamentlocationinput = creatediv({
		type: "INPUT",
		appendto: workspacebody
	})
	
	//create container for close button
	let donebuttoncontainer = creatediv({
		appendto: workspacefoot,
		divid: "administrationworkspacedonecontainer"
	})

	//add close button
	let doneicon = document.createElement("img");
	doneicon.setAttribute("src", "lib/assets/done.svg");
	doneicon.classList.add("workspaceicon");
	donebuttoncontainer.appendChild(doneicon);

	//add eventlistner to close button
	donebuttoncontainer.addEventListener("click", () =>{
		createnewtournament(tournamentdescriptioninput, tournamentlocationinput);
	})


}

let createnewtournament = async (description, location) => {
	if(description.value == "" || location.value == ""){
		alert("Bitte Beschreibung sowie Austragungsort angeben");
		return;
	}
	
	let postdata = {description: description.value, location: location.value};

	let response = await fetch("/lib/administration/php/createtournament.php", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		  },
		body: JSON.stringify(postdata)
	});
	
	let phpresponse = await response.json();

	if(phpresponse["result"] == 0){
		description.value = "";
		location.value = "";
		alert(phpresponse["message"]);
	}
}

let buildtournament = async(id) => {
	console.log('tournmanet clicked: ');
	console.log(id);
	
	gettournament(id);
}

DOMready(buildheader);
DOMready(buildnavigation);
DOMready(buildworkspace);

DOMready(addEventListeners);