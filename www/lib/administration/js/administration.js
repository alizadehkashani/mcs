let addEventListeners = () => {

}

let buildheader = () => {
	let administrationcontainer = document.getElementById("administration");

	let headercontainer = creatediv({
		divid: "headcontainer",
		appendto: administrationcontainer
	})

	creatediv({
		divid: "mcstext",
		appendto: headercontainer,
		divtext: "MCS"
	})
}

let buildnavigation = () => {
	let administrationcontainer = document.getElementById("administration");
	
	let navigationcontainer = creatediv({
		divid: "navigationcontainer",
		appendto: administrationcontainer
	})

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
		let tournament = creatediv({
			divclass: ["navigationitem-0", "navigationhover"],
			appendto: navigationvariablecontainer
		})
		
		let expandicon = document.createElement("img");
		expandicon.setAttribute("src", "lib/administration/assets/collapsed.svg");
		expandicon.classList.add("expandicon");
		expandicon.setAttribute("data-state", "collapsed");
		tournament.appendChild(expandicon);

		expandicon.addEventListener("click", () => {
			expandcollapseicon(expandicon)
		})

		let tournamenticonanddescription = creatediv({
			divclass: ["navigation-icon-description", "navigationitemhover"],
			appendto: tournament
		})

		tournamenticonanddescription.addEventListener("click", () => {
			setselectednavigation(tournament);
		})


		let tournamenticon = document.createElement("img");
		tournamenticon.setAttribute("src", "lib/administration/assets/tournament.svg");
		tournamenticon.classList.add("navigationicon");
		tournamenticonanddescription.appendChild(tournamenticon);

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

let expandcollapseicon = (node) => {

	let state = node.getAttribute("data-state");
	
	if(state == "collapsed"){
		node.setAttribute("data-state", "expanded")
		node.setAttribute("src", "lib/administration/assets/expanded.svg");

	}else{
		node.setAttribute("data-state", "collapsed")
		node.setAttribute("src", "lib/administration/assets/collapsed.svg");
	}
	
	console.log(state);

}

let gettournaments = async () => {
	let response = await fetch("/lib/administration/php/gettournaments.php");

	let tournaments = await response.json();

	return tournaments;
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
	}
}

DOMready(buildheader);
DOMready(buildnavigation);
DOMready(buildworkspace);

DOMready(addEventListeners);