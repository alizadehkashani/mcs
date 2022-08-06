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
	let workspace = creatediv({
		appendto: document.getElementById("administration"),
		divid: ["administrationworkspace"] 
	})

	let workspacehead = creatediv({
		appendto: workspace,
		divid: "administrationworkspacehead"
	})

	creatediv({
		appendto: workspace,
		divid: "administrationworkspacebody"
	})

	let closebuttoncontainer = creatediv({
		appendto: workspacehead,
		divid: "administrationworkspaceclosebuttoncontainer"
	})

	let closeicon = document.createElement("img");
	closeicon.setAttribute("src", "lib/assets/close.svg");
	closeicon.classList.add("workspaceicon");
	closebuttoncontainer.appendChild(closeicon);

	closebuttoncontainer.addEventListener("click", () =>{
		setinvisivble(workspace);
		deselectallnavigation();
	})

}

let getworkspace = () => {
	let workspace = document.getElementById("administrationworkspace");
	return workspace;
}

let clearworkspace = () => {
	let workspace = getworkspace();
	workspace.className = "";
	//cleareelement(workspace);
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
	
	let workspace = getworkspace();

	//clearworkspace();
	
	workspace.classList.add("workspacecreatetournament");
	
	setdivisible(workspace, "grid");
	
}

DOMready(buildheader);
DOMready(buildnavigation);
DOMready(buildworkspace);

DOMready(addEventListeners);