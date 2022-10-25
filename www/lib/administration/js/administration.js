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

	//create the container for variable navigation and append to the main container
	let navigationvariablecontainer = creatediv({
		divid: "navigationvariablecontainer",
		appendto: navigationcontainer
	})

	//trigger creation of variable navigation and constant navigation
	buildvariablenavigation(navigationvariablecontainer);
	buildconstantnavigation(navigationcontainer);

}

//builds the upper part of the navigation
let buildvariablenavigation = async (maincontainer) => {

	cleareelement(maincontainer);

	await buildtournamentsinit(maincontainer);
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

	sesstingsiconanddescription.addEventListener("click", () => { 
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
	globalworkspace = creatediv({
		appendto: document.getElementById("administration"),
		divid: ["administrationworkspace"] 
	})

	//create worspace head container
	let workspacehead = creatediv({
		appendto: globalworkspace,
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
		closeworkspace();
	})

	//create body
	creatediv({
		appendto: globalworkspace,
		divid: "administrationworkspacebody"
	})
	
	//creat foot
	creatediv({
		appendto: globalworkspace,
		divid: "administrationworkspacefoot"
	})
}

let closeworkspace = () => {
	changeelementvisibility(globalworkspace, false, false);
	deselectallnavigation();
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

//returns dom element of workspacebody
let getworkspaceheadvariable = () => {
	let workspaceheadvariable = document.getElementById("administrationworkspacevariablehead");
	return workspaceheadvariable;
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

let clearworkspacebody = () => {
	clearid("administrationworkspacebody");

	//remove classes from workspacebody
	document.getElementById("administrationworkspacebody").className = "";
}

let clearworkspacefoot = () => {
	clearid("administrationworkspacefoot");

	//remove classes from workspacebody
	document.getElementById("administrationworkspacefoot").className = "";
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

let createnewtournament = async (description, location) => {
	
	//test if input fields are filled, if not abort
	if(description.value == "" || location.value == ""){
		alert("Bitte Beschreibung sowie Austragungsort angeben");
		return;
	}
	
	//create object for php script
	let postdata = {description: description.value, location: location.value};

	//call php script
	let response = await fetch("/lib/administration/php/createtournament.php", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		  },
		body: JSON.stringify(postdata)
	});
	
	//response of php script
	let phpresponse = await response.json();


	if(phpresponse["result"] == 0){
		
		//set input fields initial
		description.value = "";
		location.value = "";

		//refresh variable navigation
		buildvariablenavigation(document.getElementById("navigationvariablecontainer"));

		//deactivate modal and overlay
		changeelementvisibility(document.getElementById("modal-create-tournament"), false, true);
		toggleoverlay(false);

	}else{
		alert("error");
	}


}

let createnewclub = async (tid, clubnameinput, modalcontainer) => {
	
	//test if input field is filled
	if(clubnameinput.value == ""){
		alert("Bitte Name angeben");
		return;
	}
	
	//create object for php script
	let postdata = {tid: tid, cname: clubnameinput.value};	
	
	//call php script
	let response = await fetch("/lib/administration/php/createclub.php", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		  },
		body: JSON.stringify(postdata)
	});

	//response of php script
	let phpresponse = await response.json();

	if(phpresponse["result"] == 0){
		
		//set input fields initial
		clubnameinput.value = "";
		
		//rebuild clubs table
		await fillclubstable(tid);
		
		

		//deactivate modal and overlay
		changeelementvisibility(modalcontainer, false, true);
		toggleoverlay(false);

	}else{
		alert("error");
	}

}

let updatetournament = async (tid, description, location, tournamentnamediv) => {
	let postdata = {
		tid: tid,
		description: description.value, 
		location: location.value
	};

	let response = await fetch("/lib/administration/php/updatetournament.php", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		  },
		body: JSON.stringify(postdata)
	});

	//get data from response
	let phpresponse = await response.json();

	//update tournament name in navigation
	if(phpresponse["result"] == 0){
		tournamentnamediv.innerText = description.value;
	}

}

let buildworkspaceviewtournament = async (id, tournamentnamediv) => {
	
	//get elements for workspace and workspace body
	let workspace = getworkspace();
	let workspacebody = getworkspacebody();
	let workspacefoot = getworkspacefoot();
	let workspaceheadvariable = getworkspaceheadvariable();

	//clear workspace
	clearworkspace();
	
	//remove width limit
	workspace.style.width = "";

	//make workspace visible
	changeelementvisibility(workspace, true, false);

	//create icon for tournament information
	let tournamentinformationicon = document.createElement("img");
	tournamentinformationicon.setAttribute("src", "lib/assets/tournamentinfo.svg");
	tournamentinformationicon.classList.add("workspaceicon");
	workspaceheadvariable.appendChild(tournamentinformationicon);
	tournamentinformationicon.addEventListener("click", async () => {
		await buildworkspacetournamentinformation(id, tournamentnamediv);
	})

	//create icon for track configuration
	let trackconfig = document.createElement("img");
	trackconfig.setAttribute("src", "lib/assets/track.svg");
	trackconfig.classList.add("workspaceicon");
	workspaceheadvariable.appendChild(trackconfig);
	trackconfig.addEventListener("click", async () => {
		await buildworkspacetrackconfiguration(id);
	})

	//create icon for club configuration
	let clubconfig = document.createElement("img");
	clubconfig.setAttribute("src", "lib/assets/club.svg");
	clubconfig.classList.add("workspaceicon");
	workspaceheadvariable.appendChild(clubconfig);
	clubconfig.addEventListener("click", () => {
		buildworkspaceclubinformation(id);
	})

	//create icon for player configuration
	let playerconfig = document.createElement("img");
	playerconfig.setAttribute("src", "lib/assets/player.svg");
	playerconfig.classList.add("workspaceicon");
	workspaceheadvariable.appendChild(playerconfig);
	playerconfig.addEventListener("click", () => {
		buildworkspaceplayerconfig(id);
	})	

	//create icon for tournament archive
	let archiveicon = document.createElement("img");
	archiveicon.setAttribute("src", "lib/assets/archive.svg");
	archiveicon.classList.add("workspaceicon");
	workspaceheadvariable.appendChild(archiveicon);

	//create icon for tournament deletion
	let deleteicon = document.createElement("img");
	deleteicon.setAttribute("src", "lib/assets/deletetournament.svg");
	deleteicon.classList.add("workspaceicon");
	workspaceheadvariable.appendChild(deleteicon);

	//build standard view, tournament information
	buildworkspacetournamentinformation(id, tournamentnamediv);
	//buildworkspaceclubinformation(id);
	//buildworkspacetrackconfiguration(id);
	//buildworkspaceplayerconfig(id);

}

let buildworkspacetournamentinformation = async (id, tournamentnamediv) => {
		
	//get workspace foot
	let workspacefoot = getworkspacefoot();

	//get workspace body
	let workspacebody = getworkspacebody();
	
	//clear workspace body and foot
	clearworkspacebody();
	clearworkspacefoot();
	
	//add class to workspace body
	workspacebody.classList.add("workspaceviewtournamentinformation");

	//get tournament information from database
	let tournamentinformation = await gettournament(id);

	//div for description off tournmanet description button
	creatediv({
		appendto: workspacebody,
		divtext: "Name"
	})

	//input for tournament name
	let tournamentnameinput = creatediv({
		type: "INPUT",
		appendto: workspacebody
	})
	tournamentnameinput.value = tournamentinformation[0]["tname"];

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
	tournamentlocationinput.value = tournamentinformation[0]["tlocation"];

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
		updatetournament(id, tournamentnameinput, tournamentlocationinput, tournamentnamediv);
	})

}

let buildworkspaceclubinformation = async (tid) => {
	
	//clear workspace boody and foot
	clearworkspacebody();
	clearworkspacefoot();

	let workspacebody = getworkspacebody();
	
	//add class to workspace body
	workspacebody.classList.add("workspace-view-club-information");

	//create container for create club button
	let createclubbuttoncontainer = creatediv({
		appendto: workspacebody
	})
	createclubbuttoncontainer.style.padding = "10px";

	//create icon for tournament information
	let createclubbutton = document.createElement("img");
	createclubbutton.setAttribute("src", "lib/assets/clubadd.svg");
	createclubbutton.classList.add("workspaceicon");
	createclubbuttoncontainer.appendChild(createclubbutton);
	createclubbutton.addEventListener("click", () => {
		buildmodalcreateclub(tid);
	})

	//create container for clubs table
	let clubstable = creatediv({
		divid: "clubs-table",
		appendto: workspacebody
	})

	//fill table with clubs
	await fillclubstable(tid);
	
}

let fillclubstable = async (tid) => {
	
	let clubs = await getclubs(tid);

	let tablecontainer = document.getElementById("clubs-table");
	
	cleareelement(tablecontainer);
	
	//insert data from db into table
	for(let i = 0; i < clubs.length; i++){
		
		//clubname
		let clubrow = creatediv({
			divtext: clubs[i]["cname"],
			divclass: ["clubs-table-row"],
			appendto: tablecontainer
		})

		clubrow.addEventListener("click", () =>{
			buildmodalviewclub(tid, clubs[i]["cid"]);
		})
	}
}

let buildmodalviewclub = async (tid, clubid) => {

	let club = await getclub(tid, clubid);
	
	let modal = createbasicmodal(
		"modal-view-club", 
		"Verein anzeigen", 
		"modal-view-club-body"
	);
	
	//div for description off tournmanet description button
	creatediv({
		divtext: "Name",
		appendto: modal["modalbody"]
	})

	//input for tournament description
	let clubname = creatediv({
		type: "INPUT",
		appendto: modal.modalbody
	})
	//set input value current club name
	clubname.value = club[0]["cname"];

	//create container for deletion button
	let deleteclubcuttoncontainer = creatediv({
		appendto: modal.modalbody,
		divclass: ["flexright"]
	})

	//add club deletion button
	let deleteclubbutton = document.createElement("img");
	deleteclubbutton.setAttribute("src", "lib/assets/clubremove.svg");
	deleteclubbutton.classList.add("workspaceicon");
	deleteclubcuttoncontainer.appendChild(deleteclubbutton);

	deleteclubcuttoncontainer.addEventListener("click", () => {
		deleteclub(tid, clubid);
		changeelementvisibility(modal.modalcontainer, false, true);
		toggleoverlay(false);
	})	

	modal.acceptbutton.addEventListener("click", () => {
		updateclub(tid, clubid, clubname.value);
	})

	toggleoverlay(true);
	
}

let deleteclub = async (tid, cid) => {
	//set data for php script
	let requestdata = {tid: tid, cid: cid};

	//call php script
	let phpresponse = await fetch("/lib/administration/php/deleteclub.php", {
		method: 'POST',
		headers: {
			'Accept': 'application/jsono',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(requestdata)
	});

	//variable for php resposnse
	let response = await phpresponse.json();

	//rebuild table if no error
	if(response.result == 0){
		await fillclubstable(tid);
	}else{
		alert("Error");
	}
}

let updateclub = async (tid, cid, cname) => {

	//set data for php script
	let requestdata = {tid: tid, cid: cid, cname: cname};

	//call php script
	let phpresponse = await fetch("/lib/administration/php/updateclub.php", {
		method: 'POST',
		headers: {
			'Accept': 'application/jsono',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(requestdata)
	});

	//variable for php response
	let response = await phpresponse.json();

	//if no error build clubs table
	if(response.result == 0){
		await fillclubstable(tid);
	}else{
		alert("Error");
	}
}

let getclub = async (tid, cid) => {

	//set data for php script
	let requestdata = {tid: tid, cid: cid};

	//call php script
	let phpresponse = await fetch("/lib/administration/php/getclub.php", {
		method: 'POST',
		headers: {
			'Accept': 'application/jsono',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(requestdata)
	});

	//variable for php response
	let response = await phpresponse.json();

	//return club data
	return response;
}

let getclubs = async (tid) => {

	//set data for php script
	let requestdata = {tid: tid};

	//call php script
	let phpresponse = await fetch("/lib/administration/php/getclubs.php", {
		method: 'POST',
		headers: {
			'Accept': 'application/jsono',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(requestdata)
	});

	//variable for php response
	let response = await phpresponse.json();

	//return clubs
	return response;
}

let getmatchdays = async (tid) => {
	
	//set data for php script
	let requestdata = {tid: tid};

	//call php script 
	let phpresponse = await fetch("/lib/administration/php/getmatchdays.php", {
		method: 'POST',
		headers: {
			'Accept': 'application/jsono',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(requestdata)
	});

	//variable for php response
	let response = await phpresponse.json();

	//return matchdays
	return response;
}

let getmatchday = async (tid, mdnumber) => {

	//set data for php script
	let requestdata = {tid: tid, mdnumber: mdnumber};

	//call php script 
	let phpresponse = await fetch("/lib/administration/php/getmatchday.php", {
		method: 'POST',
		headers: {
			'Accept': 'application/jsono',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(requestdata)
	});

	//variable for php response
	let response = await phpresponse.json();

	//return matchdays
	return response;
}

let getrounds = async (tid, mdnumber) => {
	
	//set data for php script
	let requestdata = {tid: tid, mdnumber: mdnumber};

	//call php script
	let phpresponse = await fetch("/lib/administration/php/getrounds.php", {
		method: 'POST',
		headers: {
			'Accept': 'application/jsono',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(requestdata)
	});

	//variable for php response
	let response = await phpresponse.json();

	//return rounds
	return response;
}

let buildmodalcreatetournament = () => {

	//get main administration container
	let administrationcontainer = document.getElementById("administration");

	//create modal container
	let modalcontainer = creatediv({
		appendto: administrationcontainer,
		divclass: ["modal"],
		divid: "modal-create-tournament"
	})

	//create modal head 
	let modalhead = creatediv({
		appendto: modalcontainer,
		divclass: ["modal-head"],
	})

	//create modal label
	let modallabel = creatediv({
		appendto: modalhead,
		divclass: ["flexleft"],
		divtext: "Turnier anlegen"
	})

	//create close button
	let closeicon = document.createElement("img");
	closeicon.setAttribute("src", "lib/assets/close.svg");
	closeicon.classList.add("workspaceicon");
	modalhead.appendChild(closeicon);

	//make modal invsible
	closeicon.addEventListener("click", () => {
		changeelementvisibility(modalcontainer, false, true);
		toggleoverlay(false);
	});

	//create modal body
	let modalbody = creatediv({
		appendto: modalcontainer,
		divclass: ["modal-body"],
		divid: "modal-create-tournament-body"
	})

	//div for description off tournmanet description button
	creatediv({
		divtext: "Name",
		appendto: modalbody
	})

	//input for tournament description
	let tournamentdescriptioninput = creatediv({
		type: "INPUT",
		appendto: modalbody
	})

	//description for tournament location input
	creatediv({
		divtext: "Austragungsort",
		appendto: modalbody
	})

	//input for tournamentlocationinput
	let tournamentlocationinput = creatediv({
		type: "INPUT",
		appendto: modalbody
	})

	//create modal foot
	let modalfoot = creatediv({
		appendto: modalcontainer,
		divclass: ["modal-foot"],
	})

	//create container for accept button
	let donebuttoncontainer = creatediv({
		appendto: modalfoot,
	})

	//add accept button
	let doneicon = document.createElement("img");
	doneicon.setAttribute("src", "lib/assets/done.svg");
	doneicon.classList.add("workspaceicon");
	donebuttoncontainer.appendChild(doneicon);

	//add eventlistner to close button
	donebuttoncontainer.addEventListener("click", () =>{
		createnewtournament(tournamentdescriptioninput, tournamentlocationinput);
	})

	//turn in overlay
	toggleoverlay(true);
}

let buildmodalcreateclub = (tid) => {
	
	//create modal
	let modal = createbasicmodal(
		"modal-create-club", 
		"Verein anlegen", 
		"modal-create-club-body"
	);
	
	//div for description off tournmanet description button
	creatediv({
		divtext: "Name",
		appendto: modal["modalbody"]
	})

	//input for tournament description
	let clubname = creatediv({
		type: "INPUT",
		appendto: modal["modalbody"]
	})

	modal.acceptbutton.addEventListener("click", () => {
		createnewclub(tid, clubname, modal.modalcontainer);
	})

	toggleoverlay(true);
}

let createnewmatchday = async (tid) => {

	//create object for php script
	let postdata = {tid: tid};	
	
	//call php script
	let response = await fetch("/lib/administration/php/creatematchday.php", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		  },
		body: JSON.stringify(postdata)
	});

	//response of php script
	let phpresponse = await response.json();

	return phpresponse["mdnumber"];

	/*
	if(phpresponse["result"] == 0){
		

		//alert user, that club was deleted
		alert("Spieltag angelegt");

	}else{
		//give alert with error message
		alert("error");
	}
	*/

}


let createbasicmodal = (mainid, labeltext, bodyid) => {
	//get main administration container
	let administrationcontainer = document.getElementById("administration");

	//create modal container
	let modalcontainer = creatediv({
		appendto: administrationcontainer,
		divclass: ["modal"],
		divid: mainid
	})

	//create modal head 
	let modalhead = creatediv({
		appendto: modalcontainer,
		divclass: ["modal-head"],
	})

	//create modal label
	let modallabel = creatediv({
		appendto: modalhead,
		divclass: ["flexleft"],
		divtext: labeltext
	})

	//create close button
	let closeicon = document.createElement("img");
	closeicon.setAttribute("src", "lib/assets/close.svg");
	closeicon.classList.add("workspaceicon");
	modalhead.appendChild(closeicon);

	//make modal invsible
	closeicon.addEventListener("click", () => {
		changeelementvisibility(modalcontainer, false, true);
		toggleoverlay(false);
	});

	//create modal body
	let modalbody = creatediv({
		appendto: modalcontainer,
		divclass: ["modal-body"],
		divid: bodyid
	})

	//create modal foot
	let modalfoot = creatediv({
		appendto: modalcontainer,
		divclass: ["modal-foot"],
	})

	//create container for accept button
	let donebuttoncontainer = creatediv({
		appendto: modalfoot,
	})

	//add accept button
	let doneicon = document.createElement("img");
	doneicon.setAttribute("src", "lib/assets/done.svg");
	doneicon.classList.add("workspaceicon");
	donebuttoncontainer.appendChild(doneicon);

	return {
		modalcontainer: modalcontainer,
		modalbody: modalbody,
		acceptbutton: donebuttoncontainer
	}
}

let buildtournamentsinit = async (maincontainer) => {

	//get the tournaments from the database
	let tournaments = await gettournaments();

	//create a new row for each tournament
	for(let i = 0; i < tournaments.length; i++){

		//create container for tournament
		let tournament = creatediv({
			divclass: ["navigationitem-0", "navigationhover"],
			appendto: maincontainer
		})
				
		//create container for expand/collapse control
		let expandcontainer = creatediv({
			appendto: tournament,
			divclass: ["expandcontainer", "flexcenter"]
		})
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
		
		// add tournament description icon container
		let tournamenticonanddescription = creatediv({
			divclass: ["navigation-icon-description", "navigationitemhover"],
			appendto: tournament
		})
		
		//add icon to tournament
		let tournamenticon = document.createElement("img");
		tournamenticon.setAttribute("src", "lib/administration/assets/tournament.svg");
		tournamenticon.classList.add("navigationicon");
		tournamenticonanddescription.appendChild(tournamenticon);
		
		//add tournament name
		let tournamentname = creatediv({
			divtext: tournaments[i]["tname"],
			divclass: ["flexleft", "navigationdescription"],
			appendto: tournamenticonanddescription
		})
		
		//add event lisnter if tournmant is selected
		tournamenticonanddescription.addEventListener("click", async () => {
			setselectednavigation(tournament);
			await buildworkspaceviewtournament(tournaments[i]["tid"], tournamentname);
		})

		//-------------------------------BUILD MATCHDAYS--------------------------------	
		//build matchdays
		await buildmatchdaysinit(maincontainer, tournaments[i]["tid"]);

		//add event listener for expand/collapse control for matchday
		polygonsvg.addEventListener("click", () => {
			
			//change polygon
			expandcollapseicon(expandcontainer, polygon);
			
			//get matchday container
			let matchdaycontainer = document.getElementById("mc-md-" + tournaments[i]["tid"]);

			//get matchdaycontainer sate
			let matchdaysstate = matchdaycontainer.getAttribute("data-state");
			
			if(matchdaysstate == "hidden"){
				//make matchdays invsible
				changeelementdisplay(matchdaycontainer, "block");
				matchdaycontainer.setAttribute("data-state", "visible");
			}else{
				changeelementdisplay(matchdaycontainer, "none");
				matchdaycontainer.setAttribute("data-state", "hidden");
			}
			
		})
		
		//------------------------------------------------------------------------------
	}

	//-------------------------------BUILD CREATE TOURNAMENT BUTTON---------------------
	
	//add create tournament
	let createtournamentcontainer = creatediv({
		divclass: ["navigationitem-0", "navigationhover"],
		appendto: maincontainer
	})

	//empty div instead of expand arrow
	creatediv({appendto: createtournamentcontainer});

	//container for icon and description
	let createtournamenticonanddescriptioncontainer = creatediv({
		divclass: ["navigation-icon-description", "navigationitemhover"],
		appendto: createtournamentcontainer
	})

	//add event listner to create new tournament button
	createtournamenticonanddescriptioncontainer.addEventListener("click", () => {

		if(document.getElementById("modal-create-tournament") == undefined){
			buildmodalcreatetournament();
		}else{
			changeelementvisibility(document.getElementById("modal-create-tournament"), true, true);
			toggleoverlay(true);
		}		

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

	//-------------filler row-----
	//let fillerrow = creatediv({appendto: maincontainer})
	//-------------filler row-----


}

let buildsinglematchday = async (container, tid, mdnumber) => {

	let matchdaycontainer = creatediv({
		divclass: ["navigationitem-1", "navigationhover"],
		appendto: container,
	})

	//create filler div
	creatediv({appendto: matchdaycontainer});
	
	//create container for expand/collapse control
	let expandcontainer = creatediv({
		appendto: matchdaycontainer,
		divclass: ["expandcontainer", "flexcenter"]
	})
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

	// add matchday description icon container
	let matchdayiconanddescription = creatediv({
		divclass: ["navigation-icon-description", "navigationitemhover"],
		appendto: matchdaycontainer
	})

	//add icon to matchday
	let matchdayicon = document.createElement("img");
	matchdayicon.setAttribute("src", "lib/assets/matchday.svg");
	matchdayicon.classList.add("navigationicon");
	matchdayiconanddescription.appendChild(matchdayicon);

	//add matchday name
	let matchdaynumber = creatediv({
		divtext: "Spieltag " + mdnumber,
		divclass: ["flexleft", "navigationdescription"],
		appendto: matchdayiconanddescription
	})

	//add event lisnter if matchday is selected
	matchdayiconanddescription.addEventListener("click", () => {
		setselectednavigation(matchdaycontainer);
		buildworkspaceviewmatchday(matchdaycontainer, tid, mdnumber);
	})

	//add event listener for expand/collapse control of rounds
	polygonsvg.addEventListener("click", () => {
	
		//change polygon
		expandcollapseicon(expandcontainer, polygon);
		
		//id of mainer container of rounds
		let mainconterroundsids = "mc-r-tid-" + tid + "-md-" + mdnumber; 

		//get container of rounds
		let maincontainerrounds = document.getElementById(mainconterroundsids);
		
		//get visiblity state of container
		let roundsstate = maincontainerrounds.getAttribute("data-state");
		
		if(roundsstate == "hidden"){
			//make rounds vsible
			changeelementdisplay(maincontainerrounds, "block");
			maincontainerrounds.setAttribute("data-state", "visible");
		}else{
			//make rounds invisible
			changeelementdisplay(maincontainerrounds, "none");
			maincontainerrounds.setAttribute("data-state", "hidden");
		}
		
	})

}

let buildmatchdays = async (navigationcontainer, container, tid, rebuild) => {
	
	//check if matchdays should be rebuild
	if(rebuild == 1){
		cleareelement(container);
	}

	//get matchdays
	let matchdays = await getmatchdays(tid);

	//loop through matchdays
	for(let j = 0; j < matchdays.length; j++){
		await buildsinglematchday(container, tid, matchdays[j]["mdnumber"]);
		await buildroundsinit(container, tid, matchdays[j]["mdnumber"]);
	}
}

let buildmatchdaysinit = async (navigationcontainer, tid) => {

	//create maincontainer for matchdays
	let maincontainermatchdays = creatediv({
		appendto: navigationcontainer 
	})

	//set id of matchday maincontainer
	maincontainermatchdays.setAttribute("id", "mc-md-" + tid);

	//set container hidden
	maincontainermatchdays.style.display = "none";

	//set data state to hidden 
	maincontainermatchdays.setAttribute("data-state", "hidden");

	//create container for days
	let containerdays = creatediv({
		appendto: maincontainermatchdays
	});
	
	//set id of days container
	containerdays.setAttribute("id", "matchdays-" + tid);
	
	//build matchdays for tournament
	await buildmatchdays(navigationcontainer, containerdays, tid, 0);

	//--------create button to create new matchday--------
	let creatematchdaycontainer = creatediv({
		divclass: ["navigationitem-1", "navigationhover"],
		appendto: maincontainermatchdays,
	})

	//create filler div
	creatediv({appendto: creatematchdaycontainer});
	creatediv({appendto: creatematchdaycontainer});

	// add matchday description icon container
	let creatematchdayiconanddescription = creatediv({
		divclass: ["navigation-icon-description", "navigationitemhover"],
		appendto: creatematchdaycontainer
	})

	//add icon to matchday
	let creatematchdayicon = document.createElement("img");
	creatematchdayicon.setAttribute("src", "lib/assets/addcircle.svg");
	creatematchdayicon.classList.add("navigationicon");
	creatematchdayiconanddescription.appendChild(creatematchdayicon);

	//add description to create matchday button
	let creatematchdaydescription = creatediv({
		divtext: "Neu",
		divclass: ["flexleft", "navigationdescription"],
		appendto: creatematchdayiconanddescription
	})

	//add event listner to create matchday
	creatematchdayiconanddescription.addEventListener("click", async () =>{
		//create new matchday and return matchday number
		let mdnumber = await createnewmatchday(tid);

		//add new matchday to navigation
		await buildsinglematchday(containerdays, tid, mdnumber);

		//build initial rounds
		await buildroundsinit(containerdays, tid, mdnumber);
	})
}

let buildsingleround = async (container, tid, md, rnumber) => {

	//create container for round
	let roundcontainer = creatediv({
		divclass: ["navigationitem-2", "navigationhover"],
		appendto: container,
	})

	//create filler div
	creatediv({appendto: roundcontainer});
	creatediv({appendto: roundcontainer});
	creatediv({appendto: roundcontainer});

	//add matchday description icon container
	let roundiconanddescription = creatediv({
		divclass: ["navigation-icon-description", "navigationitemhover"],
		appendto: roundcontainer
	})

	//add icon to matchday
	let roundicon = document.createElement("img");
	roundicon.setAttribute("src", "lib/assets/round.svg");
	roundicon.classList.add("navigationicon");
	roundiconanddescription.appendChild(roundicon);

	//add matchday name
	let matchdaynumber = creatediv({
		divtext: "Runde " + rnumber, 
		divclass: ["flexleft", "navigationdescription"],
		appendto: roundiconanddescription
	})

	//add event lisnter if round is selected
	roundiconanddescription.addEventListener("click", () => {
		setselectednavigation(roundcontainer);
		
		//TODO build workspace view round 
		buildworkspaceviewround(tid, md, rnumber, roundcontainer);

	})				

}

let buildrounds = async (container, tid, md, rebuild) => {

	//check if rounds should be rebuild
	if(rebuild == 1){
		cleareelement(container);
	}


	//get rounds
	let rounds = await getrounds(tid, md); 
	
	//loop through rounds of matchday
	for(let k = 0; k < rounds.length; k++){
		buildsingleround(container, tid, md, rounds[k]["rnumber"]);
	}
	
}

let buildroundsinit = async (matchdaycontainer, tid, md) => {

	//create maincontainer for rounds 
	let maincontainerrounds = creatediv({
		appendto: matchdaycontainer
	})

	//set id of rounds maincontainer
	maincontainerrounds.setAttribute("id", "mc-r-tid-" + tid + "-md-" + md);

	//set container hidden
	maincontainerrounds.style.display = "none";

	//set data state to hidden 
	maincontainerrounds.setAttribute("data-state", "hidden");
	
	//create container for days
	let containerrounds = creatediv({
		appendto: maincontainerrounds
	});

	//set id of days container
	containerrounds.setAttribute("id", "rounds-" + tid + "-" + md);

	await buildrounds(containerrounds, tid, md);

	//create button to create new round
	let createroundcontainer = creatediv({
		divclass: ["navigationitem-2", "navigationhover"],
		appendto: maincontainerrounds,
	})

	createroundcontainer.addEventListener("click", async () => {

		//create new ronud and return round number
		let roundnumber = await createnewround(tid, md);

		//append new round to navigation
		buildsingleround(containerrounds, tid, md, roundnumber);

	});

	//create filler div
	creatediv({appendto: createroundcontainer});
	creatediv({appendto: createroundcontainer});
	creatediv({appendto: createroundcontainer});

	// add matchday description icon container
	let createroundiconanddescription = creatediv({
		divclass: ["navigation-icon-description", "navigationitemhover"],
		appendto: createroundcontainer
	})

	//add icon to round
	let createroundicon = document.createElement("img");
	createroundicon.setAttribute("src", "lib/assets/addcircle.svg");
	createroundicon.classList.add("navigationicon");
	createroundiconanddescription.appendChild(createroundicon);

	//add description to create matchday button
	let creatematchdaydescription = creatediv({
		divtext: "Neu",
		divclass: ["flexleft", "navigationdescription"],
		appendto: createroundiconanddescription
	})

}

let createnewround = async (tid, md) => {

	//create json for php
	let postdata = {tid: tid, md: md};

	//call php script
	let response = await fetch("/lib/administration/php/createround.php", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(postdata)
	});

	//response of php script
	let phpresponse = await response.json();

	//return round number
	return phpresponse["rnumber"];

}

let buildworkspacetrackconfiguration = async (tid) => {
	
	let tracks = await gettracks(tid);

	//get workspace foot
	let workspacefoot = getworkspacefoot();

	//get workspace body
	let workspacebody = getworkspacebody();
	
	//clear workspace body and foot
	clearworkspacebody();
	clearworkspacefoot();

	//add class to workspace body
	workspacebody.classList.add("workspace-viewtrackinformation");

	//create maincontainer for creation of new track
	let maincontainercreatetrack = creatediv({
		appendto: workspacebody,
		divid: "track-create-container"
	});

	//create icon for track creation
	let addtrackicon = document.createElement("img");
	addtrackicon.setAttribute("src", "lib/assets/addcircle.svg");
	addtrackicon.classList.add("workspaceicon");
	maincontainercreatetrack.appendChild(addtrackicon);
	addtrackicon.addEventListener("click", () => {
		//build modal to create tack
		buildmodalcreatetrack(tid);
		toggleoverlay(true);

	})

	//crate main contaier for display of current tracks display
	let maincontainerdisplaytracks = creatediv({
		appendto: workspacebody,
		divclass: ["tracks-table"],
		divid: "tracks-table"
	});

	//build table of tracks
	await buildtrackstable(tid, maincontainerdisplaytracks, false); 


}

let gettracks = async (tid) => {

	let tracks = await fetch("/lib/administration/php/gettracks.php", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'content-Type': 'application/json'
		},
		body: JSON.stringify({tid: tid})
	});

	tracks = await tracks.json();

	return tracks;
}

let buildtrackstable = async (tid, container, rebuild) => {

	//if rebuild, clear container
	if(rebuild){
		cleareelement(container)
	}

	//get tracks from db
	let tracks = await gettracks(tid);

	//variable for number of tracks in tournament
	let numberoftracks = tracks.length;

	//loop through tracks and add to tracks table
	for(let i = 0; i < numberoftracks; i++){
		buildsingletrack(container, tracks[i], tid);
	}
}

let buildsingletrack = (container, trackdata, tid) => {
	
	//create new row
	let row = creatediv({
		divclass: ["tracks-table-row"]
	});

	//create div for track table
	let tracklabel = creatediv({
		divtext: trackdata.label,
		appendto: row
	});

	//create div for track table
	let trackdescription= creatediv({
		divtext: trackdata.trackdescription,
		appendto: row
	});

	row.addEventListener("click", async = () => {
		//build modal to edit track
		buildmodaledittrack(tid, trackdata.trackid);
		toggleoverlay(true);
	});

	container.appendChild(row);
}

let buildmodalcreatetrack = async (tid) => {

	//create modal
	let modal = createbasicmodal(
		"modal-create-track",
		"Bahn anlegen",
		"modal-create-track-body"
	);

	//create label for label
	let tracklabellabel = creatediv({
		divtext: "Label",
		appendto: modal.modalbody
	});

	//create input field for track label
	let tracklabelinput = creatediv({
		type: "INPUT",
		appendto: modal.modalbody
	});
	tracklabelinput.style.width = "30px";

	//limit input length to one
	tracklabelinput.addEventListener("input", () => {
		tracklabelinput.value = limitinput(1, tracklabelinput);
	});

	//create label for track description
	let labeltrackdescription = creatediv({
		divtext: "Beschreibung",
		appendto: modal.modalbody
	});

	//create input for track description
	let inputtrackdescription = creatediv({
		type: "INPUT",
		appendto: modal.modalbody
	});

	//limit input length
	inputtrackdescription.addEventListener("input", () => {
		inputtrackdescription.value = limitinput(20, inputtrackdescription);
	});

	//set eventlistener to accept button
	modal.acceptbutton.addEventListener("click", async () => {

		//set data for php script
		let requestdata = {
			tid: tid, 
			label: tracklabelinput.value, 
			trackdescription: inputtrackdescription.value
		};

		//call php script to create new track
		let response = await fetch("/lib/administration/php/createtrack.php", {
			method: 'POST',
			headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
			body: JSON.stringify(requestdata)
		});

		//response of php script
		response = await response.json();

		//if track was successfully created, close modal and turn off overlay and build table
		if(response["result"] == 0){
			await buildtrackstable(tid, document.getElementById("tracks-table"), true);			
			changeelementvisibility(modal.modalcontainer, false, true);
			toggleoverlay(false);
		}else if(response["result"] == 1){
			changeelementvisibility(modal.modalcontainer, false, true);
			toggleoverlay(false);

			alert(response["message"]);
		}

	});

}

let buildmodaledittrack = async (tid, trackid) => {

	//get track
	let trackdata = await gettrack(tid, trackid);

	//create modal
	let modal = createbasicmodal(
		"modal-edit-track",
		"Bahn",
		"modal-edit-track-body"
	);

	//create label for label
	let tracklabellabel = creatediv({
		divtext: "Label",
		appendto: modal.modalbody
	});

	//create input field for track label
	let tracklabelinput = creatediv({
		type: "INPUT",
		appendto: modal.modalbody
	});
	tracklabelinput.style.width = "30px";
	tracklabelinput.value = trackdata["label"];

	//limit input length to one
	tracklabelinput.addEventListener("input", () => {
		tracklabelinput.value = limitinput(1, tracklabelinput);
	});

	//container for button to delete track
	let containerdelbutton = creatediv({
		divclass: ["flexright"],
		appendto: modal.modalbody
	});

	//create icon for track deletion
	let deltrackicon = document.createElement("img");
	deltrackicon.setAttribute("src", "lib/assets/delete.svg");
	deltrackicon.classList.add("workspaceicon");
	containerdelbutton.appendChild(deltrackicon);
	deltrackicon.addEventListener("click", async () => {
		//DEL TRACK
		await deletetrack(tid, trackid);	

		//REBUILD TRACK TABLE
		await buildtrackstable(tid, document.getElementById("tracks-table"), true);			

		//TOGGLE MODAL
		changeelementvisibility(modal.modalcontainer, false, true);

		//TOGGLE OVERLAY
		toggleoverlay(false);
	})


	//create label for track description
	let labeltrackdescription = creatediv({
		divtext: "Beschreibung",
		appendto: modal.modalbody
	});

	//create input for track description
	let inputtrackdescription = creatediv({
		type: "INPUT",
		appendto: modal.modalbody
	});
	inputtrackdescription.value = trackdata["trackdescription"];

	//limit input length
	inputtrackdescription.addEventListener("input", () => {
		inputtrackdescription.value = limitinput(20, inputtrackdescription);
	});

	//set eventlistener to accept button
	modal.acceptbutton.addEventListener("click", async () => {

		//set data for php script
		let requestdata = {
			tid: tid, 
			trackid: trackdata["trackid"],
			label: tracklabelinput.value, 
			trackdescription: inputtrackdescription.value
		};

		//call php script to create new track
			let response = await fetch("/lib/administration/php/updatetrack.php", {
			method: 'POST',
			headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
			body: JSON.stringify(requestdata)
		});

		//response of php script
		response = await response.json();

		//if track was successfully created, close modal and turn off overlay
		if(response["result"] == 0){
			buildtrackstable(tid, document.getElementById("tracks-table"), true);			
			changeelementvisibility(modal.modalcontainer, false, true);
			toggleoverlay(false);
		}
	});

}

let gettrack = async (tid, trackid) => {

	//set request data for php script
	let requestdata = {
		tid: tid,
		trackid: trackid
	}

	//call php script
	let track = await fetch("/lib/administration/php/gettrack.php", {
		method: 'POST',
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(requestdata)
	});

	//return track
	return await track.json();
}

let deletetrack = async (tid, trackid) => {
	let phpresponse = await fetch("/lib/administration/php/deltrack.php", {
		method: 'POST',
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({tid: tid, trackid: trackid})
	});

	return await phpresponse.json();
}

let buildworkspaceplayerconfig = async (tid) => {
	
	//get workspace foot
	let workspacefoot = getworkspacefoot();

	//get workspace body
	let workspacebody = getworkspacebody();
	
	//clear workspace body and foot
	clearworkspacebody();
	clearworkspacefoot();

	//add class to workspace body
	workspacebody.classList.add("workspace-player-config");

	//create container for players selection
	let playerselectioncontainer = creatediv({
		divid: "container-player-select",
		appendto: workspacebody
	});

	//create label for club selection
	creatediv({
		divtext: "Verein",
		divclass: ["flexcenter"],
		appendto: playerselectioncontainer
	});

	//build dropdown for clubs
	let clubselection = await clubsdropdown(tid);
	playerselectioncontainer.appendChild(clubselection);

	//add button to build players table depending on club selection
	let runplayersearch = creatediv({
		appendto: playerselectioncontainer,
		divtext: "Suchen",
		divclass: ["mcsbutton"]
	});
	
	//create player butoon container
	let addplayercontainer = creatediv({
		divclass: ["flexcenter"],
		appendto: playerselectioncontainer
	});

	//add button to create new player
	let addplayersvg = document.createElement("img");
	addplayersvg.setAttribute("src", "lib/assets/playeradd.svg");
	addplayersvg.classList.add("workspaceicon");
	addplayercontainer.appendChild(addplayersvg);
	addplayersvg.addEventListener("click", async () => {
		buildmodalcreateplayer(tid, clubselection.value); 
		toggleoverlay(true);
	})

	//add container for players table
	let playerstable = creatediv({
		appendto: workspacebody,
		divid: "workspace-players-table"
	});

	//on click, build player table with current club selection
	runplayersearch.addEventListener("click", async () => {
		await buildplayerstable(playerstable, tid, clubselection.value);
	});

}

let clubsdropdown = async (tid) => {

	//get clubs from database
	let clubs = await getclubs(tid);

	//create drop down selection for club
	let clubselection = document.createElement("select");
	clubselection.setAttribute("id", "club-select-dropdown");

	//add clubs to selection
	for(let i = 0; i < clubs.length; i++){
		let option = document.createElement("option");
		option.value = clubs[i]["cid"];
		option.text = clubs[i]["cname"];
		clubselection.appendChild(option);
	}

	return clubselection;
}

let buildplayerstable = async (container, tid, cid) => {
	//empty table
	cleareelement(container);

	//get players
	let players = await getplayers(tid, cid, 0);

	//loop through players and insert into tables
	for(let i = 0; i < players.length; i++){
		buildsingleplayer(container, players[i], tid);
	}
}

let getplayer = async (tid, playernumber) => {

	let player = await fetch("/lib/administration/php/getplayer.php", {
		method: 'POST',
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({tid: tid, playernumber: playernumber})
	});

	return await player.json();
}

let buildsingleplayer = async (container, playerdata, tid) => {
	//create row
	let row = creatediv({
		appendto: container,
		divclass: ["player-row"]
	});
	//add event listner to when to display player
	row.addEventListener("click", async () => {
		await buildmodaleditplayer(tid, playerdata.playernumber);
		toggleoverlay(true);
	});

	//add playernumber
	creatediv({
		divtext: playerdata.playernumber,
		appendto: row
	});

	//add player gender
	creatediv({
		divtext: playerdata.gender,
		appendto: row
	});

	//add player surname
	creatediv({
		divtext: playerdata.surname,
		appendto: row
	});

	//add player firstname
	creatediv({
		divtext: playerdata.firstname,
		appendto: row
	});
}

let getplayers = async (tid, cid, all) => {

	//call php script to fetch players
	let players = await fetch("/lib/administration/php/getplayers.php", {
		method: 'POST',
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({tid: tid, cid: cid, all: all})
	});

	//return players
	return players.json();

}

let buildmodalcreateplayer = async (tid, currentclub) => {

	//create modal
	let modal = createbasicmodal(
		"modal-create-player",
		"Spieler anlegen",
		"modal-create-player-body"
	);

	//create label for club selection
	let clubsellabel = creatediv({
		appendto: modal.modalbody,
		divtext: "Verein"
	});

	//create club selection
	let clubssel = await clubsdropdown(tid);
	clubssel.value = currentclub;
	modal.modalbody.appendChild(clubssel);

	//create label for playernumber 
	let playernumberlabel = creatediv({
		appendto: modal.modalbody,
		divtext: "Spielernummer"
	});

	//create input for playernumber 
	let playernumberinput = creatediv({
		type: "INPUT",
		appendto: modal.modalbody
	});
	//limit input length playernumber
	playernumberinput.addEventListener("input", () => {
		playernumberinput.value = limitinput(3, playernumberinput);
	});

	//create label for gender 
	let genderlabel = creatediv({
		appendto: modal.modalbody,
		divtext: "Geschlecht"
	});

	//create input for gender 
	let genderinput = creatediv({
		type: "INPUT",
		appendto: modal.modalbody
	});
	//limit input length gender
	genderinput.addEventListener("input", () => {
		genderinput.value = limitinput(1, genderinput);
	});

	//create label for surname 
	let surnamelabel = creatediv({
		appendto: modal.modalbody,
		divtext: "Nachname"
	});

	//create input for surname 
	let surnameinput = creatediv({
		type: "INPUT",
		appendto: modal.modalbody
	});
	//limit input length surname
	surnameinput.addEventListener("input", () => {
		surnameinput.value = limitinput(20, surnameinput);
	});

	//create label for firstname 
	let firstnamelabel = creatediv({
		appendto: modal.modalbody,
		divtext: "Vorname"
	});

	//create input for surname 
	let firstnameinput = creatediv({
		type: "INPUT",
		appendto: modal.modalbody
	});
	//limit input length firstname
	firstnameinput.addEventListener("input", () => {
		firstnameinput.value = limitinput(20, firstnameinput);
	});

	//add event listner to accept button
	modal.acceptbutton.addEventListener("click", async () =>{
		//create json for php
		phpinput = {
			tid: tid,
			cid: clubssel.value,
			playernumber: playernumberinput.value,
			gender: genderinput.value,
			surname: surnameinput.value,
			firstname: firstnameinput.value
		}

		//call php script
		let createplayer = await fetch("/lib/administration/php/createplayer.php", {
			method: 'POST',
			header: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(phpinput)
		});

		//php response
		let phpresponse = await createplayer.json();
		
		if(phpresponse["result"] == 1){
			alert(phpresponse["message"]);
		}else{
			//reset inputs when succsessfull
			playernumberinput.value = "";
			genderinput.value = "";
			surnameinput.value = "";
			firstnameinput.value = "";

			//build table again with cid which new player was created in
			await buildplayerstable(document.getElementById("workspace-players-table"), tid, clubssel.value); 
		}
	});

}

let buildmodaleditplayer = async (tid, playernumber) => {

	//create modal
	let modal = createbasicmodal(
		"modal-edit-player",
		"Spieler",
		"modal-edit-player-layout"
	);

	//get playerdata from db
	let playerdata = await getplayer(tid, playernumber);

	let playerinfo = creatediv({
		appendto: modal.modalbody,
		divid: "modal-edit-player-body"
	});

	//create label for club selection
	let clubsellabel = creatediv({
		appendto: playerinfo,
		divtext: "Verein"
	});

	//create club selection
	let clubssel = await clubsdropdown(tid);
	clubssel.value = playerdata["cid"];
	playerinfo.appendChild(clubssel);

	//create label for playernumber 
	let playernumberlabel = creatediv({
		appendto: playerinfo,
		divtext: "Spielernummer"
	});

	//create input for playernumber 
	let playernumberinput = creatediv({
		type: "INPUT",
		appendto: playerinfo
	});
	playernumberinput.value = playerdata["playernumber"];
	//limit input length playernumber
	playernumberinput.addEventListener("input", () => {
		playernumberinput.value = limitinput(3, playernumberinput);
	});

	//create label for gender 
	let genderlabel = creatediv({
		appendto: playerinfo,
		divtext: "Geschlecht"
	});

	//create input for gender 
	let genderinput = creatediv({
		type: "INPUT",
		appendto: playerinfo
	});
	genderinput.value = playerdata["gender"];
	//limit input length gender
	genderinput.addEventListener("input", () => {
		genderinput.value = limitinput(1, genderinput);
	});

	//create label for surname 
	let surnamelabel = creatediv({
		appendto: playerinfo,
		divtext: "Nachname"
	});

	//create input for surname 
	let surnameinput = creatediv({
		type: "INPUT",
		appendto: playerinfo
	});
	surnameinput.value = playerdata["surname"];
	//limit input length surname
	surnameinput.addEventListener("input", () => {
		surnameinput.value = limitinput(20, surnameinput);
	});

	//create label for firstname 
	let firstnamelabel = creatediv({
		appendto: playerinfo,
		divtext: "Vorname"
	});

	//create input for surname 
	let firstnameinput = creatediv({
		type: "INPUT",
		appendto: playerinfo
	});
	firstnameinput.value = playerdata["firstname"];
	//limit input length firstname
	firstnameinput.addEventListener("input", () => {
		firstnameinput.value = limitinput(20, firstnameinput);
	});

	//add button to delete user
	//create container for deletion button
	let deleteplayerbuttoncontainer = creatediv({
		appendto: modal.modalbody,
		divclass: ["flexcenter"]
	})

	//add player deletion button
	let deleteplayerbutton = document.createElement("img");
	deleteplayerbutton.setAttribute("src", "lib/assets/playerremove.svg");
	deleteplayerbutton.classList.add("workspaceicon");
	deleteplayerbuttoncontainer.appendChild(deleteplayerbutton);

	//add eventlistener to deletebutton
	deleteplayerbuttoncontainer.addEventListener("click", async () => {
		//delete player
		delteplayer(
			modal.modalcontainer, 
			playerdata.tid, 
			playerdata.cid, 
			playerdata.playernumber
		);



	});

	//add event listner to accept button
	//update player
	modal.acceptbutton.addEventListener("click", async () => {
		//create json for php
		playerdata = {
			tid: tid,
			cid: clubssel.value,
			playernumber: playernumberinput.value,
			gender: genderinput.value,
			surname: surnameinput.value,
			firstname: firstnameinput.value
		}

		updateplayer(playerdata, modal.modalcontainer);

		
	});
}

let buildworkspaceviewmatchday = (mdcontainer, tid, mdnumber) => {
	
	//get elements for workspace and workspace body
	let workspace = getworkspace();
	let workspacebody = getworkspacebody();
	let workspacefoot = getworkspacefoot();
	let workspaceheadvariable = getworkspaceheadvariable();

	//clear workspace
	clearworkspace();
	
	//remove width limit
	workspace.style.width = "";

	//make workspace visible
	changeelementvisibility(workspace, true, false);

	//create icon for tournament information
	let matchdayinformationicon = document.createElement("img");
	matchdayinformationicon.setAttribute("src", "lib/assets/matchdayinformation.svg");
	matchdayinformationicon.classList.add("workspaceicon");
	workspaceheadvariable.appendChild(matchdayinformationicon);
	matchdayinformationicon.addEventListener("click", () => {
		//displays matchday information
		buildworkspacematchdayinformation(tid, mdnumber);
	})

	//create icon for matchday deletion 
	let matchdaydeletionicon = document.createElement("img");
	matchdaydeletionicon.setAttribute("src", "lib/assets/delete.svg");
	matchdaydeletionicon.classList.add("workspaceicon");
	workspaceheadvariable.appendChild(matchdaydeletionicon);
	matchdaydeletionicon.addEventListener("click", async () => {
		//deletematchday
		let delmdresp = await deletematchday(tid, mdnumber);
		console.log(delmdresp);
		if(delmdresp.result == 0){
			//get container with rounds
			let roundcontainerid = "mc-r-tid-" + tid + "-md-" + mdnumber;
			let roundcontainer = document.getElementById(roundcontainerid);
			
			roundcontainer.remove();
			mdcontainer.remove();

			//close workspace
			closeworkspace();

		}else{
			alert(delmdresp.message);
		}
	})


	buildworkspacematchdayinformation(tid, mdnumber);

}

let buildworkspacematchdayinformation = async (tid, mdnumber) => {

	//get workspace body
	let workspacebody = getworkspacebody();

	//get workspace foot
	let workspacefoot = getworkspacefoot();
	
	//clear workspace body and foot
	clearworkspacebody();
	clearworkspacefoot();
	
	//add class to workspace body
	workspacebody.classList.add("workspace-view-matchdayinformation-body");

	//get tournament information from database
	let matchdayinformation = await getmatchday(tid, mdnumber);

	//container to store information about basic matchday information
	let matchdayinfoinputcontainer = creatediv({
		appendto: workspacebody,
		divclass: ["workspace-view-matchdayinformation-input-container"]
	});

	//label for matchday number
	let labelmdnumber = creatediv({
		appendto: matchdayinfoinputcontainer,
		divtext: "Nummer:"
	});

	//matchday number
	let mdnumberdisplay = creatediv({
		appendto: matchdayinfoinputcontainer,
		divtext: matchdayinformation["mdnumber"]
	});
	
	//label for matchday description
	let mddescriptionlabel = creatediv({
		appendto: matchdayinfoinputcontainer,
		divtext: "Beschreibung:"
	});

	//matchday description input
	let mddescription = creatediv({
		type: "INPUT",
		appendto: matchdayinfoinputcontainer,
	});
	mddescription.value = matchdayinformation["mddescription"];

	//label for active matchday
	let activelabel = creatediv({
		appendto: matchdayinfoinputcontainer,
		divtext: "Aktiver Tag"
	});

	let activemd = creatediv({
		appendto: matchdayinfoinputcontainer
	});
		
	//set x if current matchday
	if(matchdayinformation.mdcurrent == 0){
		activemd.innerHTML = "-";
		var pathtosvg = "lib/assets/toggleoff.svg";
	}else if(matchdayinformation.mdcurrent == 1){
		activemd.innerHTML = "X";
		var pathtosvg = "lib/assets/toggleon.svg";
	}

	//lable for md activation
	creatediv({
		appendto: matchdayinfoinputcontainer,
		divtext: "Tag aktiv setzen"
	});

	//create container for button
	let setcurrentbuttoncontainer = creatediv({
		appendto: matchdayinfoinputcontainer
	});

	//button to set matchday current
	let setcurrentbutton = document.createElement("img");
	setcurrentbutton.setAttribute("src", pathtosvg);
	setcurrentbutton.classList.add("workspaceicon");
	setcurrentbuttoncontainer.appendChild(setcurrentbutton);
	setcurrentbutton.addEventListener("click", async () => {

		//if md is not actifve, allows to activate
		if(matchdayinformation.mdcurrent == 0){
			let activate = await setmdactive(matchdayinformation.tid, matchdayinformation.mdnumber);
			//if md was succsessfully activated
			//change icon and set X
			if(activate == 0){
				//cleareelement(setcurrentbuttoncontainer);
				setcurrentbutton.setAttribute("src", "lib/assets/toggleon.svg")
				activemd.innerHTML = "X";

			}
		}

	});

	//container to display informtion about rounds in matchday
	let matchdayroundsinformation = creatediv({
		divclass: ["workspace-view-maytchdayinformation-roundsoverview"],
		appendto: workspacebody
	});

	//get number of rounds of that matchday from database
	let numberofrounds = await getnumberofrounds(tid, mdnumber);

	//label for number of rounds
	let numberofroundslabel = creatediv({
		appendto: matchdayroundsinformation,
		divtext: "Anzahl Runden"
	});

	//display number of rounds
	let numberofroundsdisplay = creatediv({
		appendto: matchdayroundsinformation,
		divtext: numberofrounds
	});

	//create container for done button
	let donebuttoncontainer = creatediv({
		appendto: workspacefoot,
		divid: "administrationworkspacedonecontainer"
	})

	//add done button
	let doneicon = document.createElement("img");
	doneicon.setAttribute("src", "lib/assets/done.svg");
	doneicon.classList.add("workspaceicon");
	donebuttoncontainer.appendChild(doneicon);

	//add eventlistner to done button
	donebuttoncontainer.addEventListener("click", () =>{

		//data of matchday
		let mddata = {
			tid: tid,
			mdnumber: mdnumber,
			mddescription: mddescription.value
		}

		updatematchday(mddata);
	})

}

let getnumberofrounds = async (tid, mdnumber) => {
	let phpinput = {tid: tid, mdnumber: mdnumber};


	//call php script
	let numberofrounds = await fetch("/lib/administration/php/getnumberofrounds.php", {
		method: 'POST',
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(phpinput)
	});

	//return response
	return await numberofrounds.json();
}

let updatematchday = async (mddata) => {

	//call php script
	let createplayer = await fetch("/lib/administration/php/updatematchday.php", {
		method: 'POST',
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(mddata)
	});

	//php response
	let phpresponse = await createplayer.json();

}

let updateplayer = async (playerdata, modalcontainer) => {

	//call php script
	let phppath = "/lib/administration/php/updateplayer.php";
	let updateplayer = await fetch(phppath, {
		method: 'POST',
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(playerdata)
	});

	//php response
	let phpresponse = await updateplayer.json();
	
	if(phpresponse["result"] == 1){
		alert(phpresponse["message"]);
	}else{
		//close modal turn off overlay
		let tableid = "workspace-players-table";
		let table = document.getElementById(tableid);
		await buildplayerstable(table, playerdata.tid, playerdata.cid); 
		changeelementvisibility(modalcontainer, false, true);
		toggleoverlay(false);
	}

}

let delteplayer = async (modal, tid, cid, playernumber) => {

	//data of player which should be deleted
	playerdata = {
		tid: tid,
		cid: cid,
		playernumber: playernumber
	}

	//call php script
	let phppath = "/lib/administration/php/deleteplayer.php";
	let deleteplayer = await fetch(phppath, {
		method: 'POST',
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(playerdata)
	});

	//php response
	let phpresponse = await deleteplayer.json();
	
	if(phpresponse["result"] == 1){
		alert(phpresponse["message"]);
	}else{
		let tableid = "workspace-players-table";
		let table = document.getElementById(tableid);
		await buildplayerstable(table, playerdata.tid, playerdata.cid); 
		//close modal turn off overlay
		changeelementvisibility(modal, false, true);
		toggleoverlay(false);
	}

}

let setmdactive = async (tid, mdnumber) => {

	mddata = {
		tid: tid,
		mdnumber: mdnumber,
		mdcurrent: 1
	}

	//call php script
	let phppath = "/lib/administration/php/setmdcurrent.php";
	let activemd = await fetch(phppath, {
		method: 'POST',
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(mddata)
	});

	//php response
	let phpresponse = await activemd.json();
	
	return phpresponse["result"];

}

let deletematchday = async (tid, mdnumber) => {

	mddata = {
		tid: tid,
		mdnumber: mdnumber,
	}

	//call php script
	let phppath = "/lib/administration/php/deletematchday.php";
	let activemd = await fetch(phppath, {
		method: 'POST',
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(mddata)
	});

	//php response
	let phpresponse = await activemd.json();
	
	return phpresponse;

}

let buildworkspaceviewround = async (tid, mdnumber, rnumber, roundcontainer) => {

	//get elements for workspace and workspace body
	let workspace = getworkspace();
	let workspacebody = getworkspacebody();
	let workspacefoot = getworkspacefoot();
	let workspaceheadvariable = getworkspaceheadvariable();

	//clear workspace
	clearworkspace();
	
	//remove width limit
	workspace.style.width = "";

	//make workspace visible
	changeelementvisibility(workspace, true, false);

	//create icon for round information
	let roundinformationicon = document.createElement("img");
	roundinformationicon.setAttribute("src", "lib/assets/info.svg");
	roundinformationicon.classList.add("workspaceicon");
	workspaceheadvariable.appendChild(roundinformationicon);
	roundinformationicon.addEventListener("click", () => {
		//displays round information
		buildworkspaceroundinformation(tid, mdnumber, rnumber);
	})

	//create icon for round deletion 
	let rounddeletionicon = document.createElement("img");
	rounddeletionicon.setAttribute("src", "lib/assets/delete.svg");
	rounddeletionicon.classList.add("workspaceicon");
	workspaceheadvariable.appendChild(rounddeletionicon);
	rounddeletionicon.addEventListener("click", async () => {

		//deleteround
		let delroundresp = await deleteround(tid, mdnumber, rnumber);
		if(delroundresp.result == 0){
			
			//delte round container
			roundcontainer.remove();

			//close workspace
			closeworkspace();

		}else{
			alert(delroundresp.message);
		}
	})

	buildworkspaceroundinformation(tid, mdnumber, rnumber);
}

let buildworkspaceroundinformation = async (tid, mdnumber, rnumber) => {


}

let deleteround = async (tid, mdnumber, rnumber) => {

	rdata = {
		tid: tid,
		mdnumber: mdnumber,
		rnumber: rnumber
	}

	//call php script
	let phppath = "/lib/administration/php/deleteround.php";
	let delround = await fetch(phppath, {
		method: 'POST',
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(rdata)
	});

	//php response
	let phpresponse = await delround.json();
	
	return phpresponse;

}

DOMready(buildheader);
DOMready(buildnavigation);
DOMready(buildworkspace);

DOMready(addEventListeners);
