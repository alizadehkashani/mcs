let addEventListeners = () => {

}

//create header for main container
let buildheader = async () => {

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

	//create container for current tournament name
	let currenttournamentnamecontainer = creatediv({
		appendto: headercontainer,
		divid: "headercurrenttournamentname",
		divclass: ["flexleft"],
	});
	
	//show name of current tournmanet
	let currenttournament = await getcurrenttournament();
	
	//set the tournament name as  header
	setcurrenttournamentnameheader(currenttournament["tname"]);

	//create navigation for tournametns
	//create selection
	let tournamentsdropdown = await buildtournamentsdropdown();
	//append selection to header container
	headercontainer.appendChild(tournamentsdropdown );

	//add icon for tournament information
	let tournamentinformationicon = document.createElement("div");
	tournamentinformationicon.classList.add("icon-info");
	tournamentinformationicon.classList.add("icon");
	tournamentinformationicon.classList.add("workspaceicon");
	headercontainer.appendChild(tournamentinformationicon);
	tournamentinformationicon.addEventListener("click", async () => {
		//await buildworkspacetournamentinformation(id, tournamentnamediv);
		await buildworkspaceviewtournament(tournamentsdropdown.value);
	})


}

//triggers creation for main navigation
let buildnavigation = async () => {
		
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

	//build constant navigation
	buildconstantnavigation(navigationcontainer);

}

//builds the upper part of the navigation
let buildvariablenavigation = async (tid) => {

	//get maincontainer for variable navigation
	let maincontainer = document.getElementById("navigationvariablecontainer");
	//clear the main container
	clearelement(maincontainer);

	//get data from selected tournament
	let tdata = await gettournamentdata(tid);
	
	//create container for individual matchdays
	let individualmdcontainer = creatediv({
		appendto: maincontainer
	});
	
	//check if php response is not empty
	if(tdata.length != 0){
		let i = 0;
		let currentmdbuild = 0;
		let numbermdbuild = 0;
		let numberrdbuild;

		//loop through php response
		while(i < tdata.length){ 	
			//check if the current matchday being build
			//is the matchday for the current index in the arrary
			//if the current matchday being build does not match the current index
			if(tdata[i]["mid"] != currentmdbuild){

				//set the new matchday to the current one being build
				currentmdbuild = tdata[i]["mid"];
				//increase the number of matchdays which have been build
				numbermdbuild++;

				//build the matchday
				buildsinglematchday(individualmdcontainer, tdata[i], numbermdbuild);

				//build container for the rounds of the matchday
				let rdscontainer = buildroundsinit(individualmdcontainer, tid, tdata[i]["mid"]);

				//check if matchday has any rounds
				if(tdata[i]["rid"] != null){
					//if the matchday has rounds
					//set number rounds build to one
					numberrdbuild = 1;

					//while still in the same matchday
					//build the rounds
					//break loop if the matchday changes
					while(currentmdbuild === tdata[i]["mid"]){
						//if round exists
						if(tdata[i]["rid"] != null){
							//build single round
							buildsingleround(rdscontainer, tdata[i], numberrdbuild);
							//incrase number rounds build
							numberrdbuild++;
						}

						currentmdbuild = tdata[i]["mid"];

						//increase variable for array loop
						i++;
						if(i == tdata.length){
							break;
						}
					}

				}else{
					//if the matchday changes do not build round
					currentmdbuild = tdata[i]["mid"];

					//increase variable for array loop
					i++;
				}
			}
		}


	}
	
	//create div for create matchday button on bottom
	let creatematchdaybuttoncontainer = creatediv({
		appendto: maincontainer
	});

	//create button for new matchday
	await buildmatchdaycreatebutton(creatematchdaybuttoncontainer, individualmdcontainer, tid);

	//await buildtournamentsinit(maincontainer);
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
	let settingsinconanddescription = creatediv({
		divclass: ["navigation-icon-description"],
		appendto: settingscontainer
	})

	settingsinconanddescription.addEventListener("click", () => { 
		setselectednavigation(settingscontainer, "navigation");
		buildsettingsworkspace();
	})

	let settingsicon = document.createElement("img");
	settingsicon.setAttribute("src", "lib/administration/assets/settings.svg");
	settingsicon.classList.add("navigationicon");
	settingsinconanddescription.appendChild(settingsicon);

	let settingsdescription = creatediv({
		appendto: settingsinconanddescription,
		divclass: ["flexleft", "navigationdescription"],
		divtext: "Einstellungen"
	})
}

let buildsettingsworkspace = () => {
	
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

	//create icon for club configuration
	let clubconfig = document.createElement("div");
	clubconfig.classList.add("icon-club");
	clubconfig.classList.add("icon");
	clubconfig.classList.add("workspaceicon");
	workspaceheadvariable.appendChild(clubconfig);
	clubconfig.addEventListener("click", async () => {
		await buildworkspaceclubinformation();
	})

	//create icon for player configuration
	let playerconfig = document.createElement("div");
	playerconfig.classList.add("icon-player");
	playerconfig.classList.add("icon");
	playerconfig.classList.add("workspaceicon");
	workspaceheadvariable.appendChild(playerconfig);
	playerconfig.addEventListener("click", async () => {
		await buildworkspaceplayerconfig();
	})	
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
	let closeicon = document.createElement("div");
	closeicon.classList.add("icon-cross");
	closeicon.classList.add("icon");
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
	deselectallnavigation("navigation");
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

let setselectednavigation = (div, type) => {
	
	let selector;
	let hover;

	switch(type){
		case 'navigation':
			selector = "selectednavigation";
			hover = "navigationhover";
			break;
		case 'track':
			selector = "selectedtrack";
			hover = "trackhover";
			break;
	}

	deselectallnavigation(selector, hover);

	div.classList.remove(hover);
	div.classList.add(selector);

}

let deselectallnavigation = (selector, hover) => {

	let currentselected = document.querySelector("." + selector);

	if(currentselected != null){
		currentselected.classList.remove(selector);
		currentselected.classList.add(hover);
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

let createnewclub = async (clubnameinput, modalcontainer) => {
	
	//test if input field is filled
	if(clubnameinput.value == ""){
		alert("Bitte Name angeben");
		return;
	}
	
	//create object for php script
	let postdata = {cname: clubnameinput.value};	
	
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
		await fillclubstable();

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

let buildworkspaceviewtournament = async (id, tournamentnamediv, tournamenticon) => {
	
	//get elements for workspace and workspace body
	let workspace = getworkspace();
	let workspacebody = getworkspacebody();
	let workspacefoot = getworkspacefoot();
	let workspaceheadvariable = getworkspaceheadvariable();

	//clear workspace
	clearworkspace();

	//deselct any currently selected navigation items
	deselectallnavigation("selectednavigation");
	
	//remove width limit
	workspace.style.width = "";

	//make workspace visible
	changeelementvisibility(workspace, true, false);

	//create icon for tournament information
	let tournamentinformationicon = document.createElement("div");
	tournamentinformationicon.classList.add("icon-info");
	tournamentinformationicon.classList.add("icon");
	tournamentinformationicon.classList.add("workspaceicon");
	workspaceheadvariable.appendChild(tournamentinformationicon);
	tournamentinformationicon.addEventListener("click", async () => {
		await buildworkspacetournamentinformation(id, tournamentnamediv);
	})

	//create icon for track configuration
	let trackconfig = document.createElement("div");
	trackconfig.classList.add("icon-track");
	trackconfig.classList.add("icon");
	trackconfig.classList.add("workspaceicon");
	workspaceheadvariable.appendChild(trackconfig);
	trackconfig.addEventListener("click", async () => {
		await buildworkspacetrackconfiguration(id);
	})

	//create icon for player configuration
	let playerconfig = document.createElement("div");
	playerconfig.classList.add("icon-player");
	playerconfig.classList.add("icon");
	playerconfig.classList.add("workspaceicon");
	workspaceheadvariable.appendChild(playerconfig);
	playerconfig.addEventListener("click", async () => {
		await buildworkspaceplayerintconfig(id);
	})	

	//create icon for tournament archive
	let archiveicon = document.createElement("div");
	archiveicon.classList.add("icon-archive");
	archiveicon.classList.add("icon");
	archiveicon.classList.add("workspaceicon");
	workspaceheadvariable.appendChild(archiveicon);

	//create icon for tournament deletion
	let deleteicon = document.createElement("div");
	deleteicon.classList.add("icon-deltournament");
	deleteicon.classList.add("icon");
	deleteicon.classList.add("workspaceicon");
	workspaceheadvariable.appendChild(deleteicon);

	//build standard view, tournament information
	buildworkspacetournamentinformation(id, tournamentnamediv, tournamenticon);

}

let buildworkspacetournamentinformation = async (id, tournamentnamediv, tournamenticon) => {

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
	tournamentnameinput.value = tournamentinformation["tname"];

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
	tournamentlocationinput.value = tournamentinformation["tlocation"];

	//label for active tournament toggle
	creatediv({
		appendto: workspacebody,
		divtext: "Aktiv"
	});

	//add toggle button for active tournament
	let togglebutton = creatediv({
		appendto: workspacebody,
		divclass: ["icon"]
	});

	//check if tournament is active
	if(tournamentinformation["tcurrent"] == 1){
		togglebutton.classList.add("icon-toggleon");
	}else{
		togglebutton.classList.add("icon-toggleoff");
	}

	
	togglebutton.addEventListener("click", async () => {
		
		//if tournament is not active, allows to activate
		if(tournamentinformation["tcurrent"] == 0){
			let activate = await settcurrent(tournamentinformation["tid"]);
			//if tournament was succsessfully activated
			//change icon and set X
			if(activate == 0){
				//if matchday is currently not active, set toggle button to on
				togglebutton.classList.remove("icon-toggleoff");
				togglebutton.classList.add("icon-toggleon");
				setcurrenttournamentnameheader(tournamentinformation["tname"]);
				replaceclassindoc("icon-tournament-active", "icon-tournament");
				replaceclassindoc("icon-matchday-active", "icon-matchday");
				replaceclassindoc("icon-round-active", "icon-round");
				tournamenticon.classList.remove("icon-tournament");
				tournamenticon.classList.add("icon-tournament-active");

			}
		}
	});

	//create container for accept button
	let donebuttoncontainer = creatediv({
		appendto: workspacefoot,
		divid: "administrationworkspacedonecontainer"
	})
	
	//add accept button
	let doneicon = document.createElement("div");
	doneicon.classList.add("icon-checkmark");
	doneicon.classList.add("icon");
	donebuttoncontainer.appendChild(doneicon);

	//add eventlistner to close button
	donebuttoncontainer.addEventListener("click", () =>{
		updatetournament(id, tournamentnameinput, tournamentlocationinput, tournamentnamediv);
	})

}

let buildworkspaceclubinformation = async () => {
	
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

	//create icon for adding club
	let createclubbutton = document.createElement("div");
	createclubbutton.classList.add("icon-clubplus");
	createclubbutton.classList.add("icon");
	createclubbutton.classList.add("workspaceicon");
	createclubbuttoncontainer.appendChild(createclubbutton);
	createclubbutton.addEventListener("click", () => {
		buildmodalcreateclub();
	})

	//create container for clubs table
	let clubstable = creatediv({
		divid: "clubs-table",
		appendto: workspacebody
	})

	//fill table with clubs
	await fillclubstable();
	
}

let fillclubstable = async () => {
	
	let clubs = await getclubs();

	let tablecontainer = document.getElementById("clubs-table");
	
	clearelement(tablecontainer);
	
	//insert data from db into table
	for(let i = 0; i < clubs.length; i++){
		
		//clubname
		let clubrow = creatediv({
			divtext: clubs[i]["cname"],
			divclass: ["clubs-table-row"],
			appendto: tablecontainer
		})

		clubrow.addEventListener("click", () =>{
			buildmodalviewclub(clubs[i]["cid"]);
		})
	}
}

let buildmodalviewclub = async (clubid) => {

	let club = await getclub(clubid);
	
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
		deleteclub(clubid);
		changeelementvisibility(modal.modalcontainer, false, true);
		toggleoverlay(false);
	})	

	modal.acceptbutton.addEventListener("click", () => {
		updateclub(clubid, clubname.value);
	})

	toggleoverlay(true);
	
}

let deleteclub = async (cid) => {
	//set data for php script
	let requestdata = {cid: cid};

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
		await fillclubstable();
	}else{
		alert("Error");
	}
}

let updateclub = async (cid, cname) => {

	//set data for php script
	let requestdata = {cid: cid, cname: cname};

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
		await fillclubstable();
	}else{
		alert("Error");
	}
}

let getclub = async (cid) => {

	//set data for php script
	let requestdata = {cid: cid};

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

let getclubs = async () => {

	//call php script
	let phpresponse = await fetch("/lib/administration/php/getclubs.php", {
		method: 'POST',
		headers: {
			'Accept': 'application/jsono',
			'Content-Type': 'application/json'
		}
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

let getmatchday = async (tid, mid) => {

	//set data for php script
	let requestdata = {tid: tid, mid: mid};

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

let getrounds = async (tid, mid) => {
	
	//set data for php script
	let requestdata = {tid: tid, mid: mid};

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

let buildmodalcreateclub = () => {
	
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
		createnewclub(clubname, modal.modalcontainer);
	})

	toggleoverlay(true);
}

let createnewmatchday = async (tid) => {

	//create object for php script
	let postdata = {tid: tid};	
	
	let phppath = "/lib/administration/php/creatematchday.php"
	//call php script
	let response = await fetch(phppath, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		  },
		body: JSON.stringify(postdata)
	});

	//response of php script
	let phpresponse = await response.json();

	//backend returns matchday id and its order
	return phpresponse;
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
	let closeicon = document.createElement("div");
	closeicon.classList.add("icon-cross");
	closeicon.classList.add("icon");
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
	let doneicon = document.createElement("div");
	doneicon.classList.add("icon-checkmark");
	doneicon.classList.add("icon");
	doneicon.classList.add("workspaceicon");
	donebuttoncontainer.appendChild(doneicon);

	return {
		modalcontainer: modalcontainer,
		modalbody: modalbody,
		acceptbutton: donebuttoncontainer
	}
}

let buildsinglematchday = async (container, mddata, mdnumber) => {

	let matchdaycontainer = creatediv({
		divclass: ["navigationitem-0", "navigationhover"],
		appendto: container,
	})
	
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
	let matchdayicon = document.createElement("div");
	switch(parseInt(mddata["mdcurrent"])){
		case 1:
			matchdayicon.classList.add("icon-matchday-active");
			break;
		case 0:
			matchdayicon.classList.add("icon-matchday");
			break;
	}
	matchdayicon.classList.add("icon");
	matchdayiconanddescription.appendChild(matchdayicon);
	
	//add matchday name
	let matchdaynumber = creatediv({
		divtext: "Spieltag " + mdnumber,
		divclass: ["flexleft", "navigationdescription"],
		appendto: matchdayiconanddescription
	})


	//add event lisnter if matchday is selected
	matchdayiconanddescription.addEventListener("click", () => {
		setselectednavigation(matchdaycontainer, "navigation");
		buildworkspaceviewmatchday(container, matchdaycontainer, mddata.tid, mddata.mid, matchdayicon);
	})


	//add event listener for expand/collapse control of rounds
	polygonsvg.addEventListener("click", () => {
	
		//change polygon
		expandcollapseicon(expandcontainer, polygon);
		
		//id of mainer container of rounds
		let maincontainerrounds = matchdaycontainer.nextElementSibling;
		
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

let buildmatchdaycreatebutton = async (mainvarnavcontainer, matchdayscontainer, tid) => {
	let creatematchdaycontainer = creatediv({
		divclass: ["navigationitem-0", "navigationhover"],
		appendto: mainvarnavcontainer,
	})
	
	//create filler div
	creatediv({appendto: creatematchdaycontainer});
	
	// add matchday description icon container
	let creatematchdayiconanddescription = creatediv({
		divclass: ["navigation-icon-description", "navigationitemhover"],
		appendto: creatematchdaycontainer
	})

	//add icon to create matchday
	let creatematchdayicon = document.createElement("div");
	creatematchdayicon.classList.add("icon-plus");
	creatematchdayicon.classList.add("icon");
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
		let mddata = await createnewmatchday(tid);

		//add new matchday to navigation
		await buildsinglematchday(matchdayscontainer, mddata, mddata.numberofmatchdays + 1);

		//build initial rounds
		await buildroundsinit(matchdayscontainer, tid, mddata["mid"]);
	})

}

let buildsingleround = async (container, rdata, roundorder ) => {

	//create container for round
	let roundcontainer = creatediv({
		divclass: ["navigationitem-2", "navigationhover"],
		appendto: container,
	})

	//create filler div
	creatediv({appendto: roundcontainer});
	creatediv({appendto: roundcontainer});

	//add round description icon container
	let roundiconanddescription = creatediv({
		divclass: ["navigation-icon-description", "navigationitemhover"],
		appendto: roundcontainer
	})

	//add icon to round
	let roundicon = document.createElement("div");
	roundicon.classList.add("icon-round");
	switch(parseInt(rdata["rcurrent"])){
		case 1:
			roundicon.classList.add("icon-round-active");
			break;
		case 0:
			roundicon.classList.add("icon-round");
			break;
	}
	roundicon.classList.add("icon");
	roundiconanddescription.appendChild(roundicon);

	//add round name
	let roundnumber = creatediv({
		divtext: "Runde " + roundorder, 
		divclass: ["flexleft", "navigationdescription"],
		appendto: roundiconanddescription
	})

	//add event lisnter if round is selected
	roundiconanddescription.addEventListener("click", () => {
		setselectednavigation(roundcontainer, "navigation");

		//build workspace view round 
		buildworkspaceviewround(container, roundcontainer, rdata, roundicon);

	})				

}

let buildrounds = async (container, tid, mid, rebuild) => {

	//check if rounds should be rebuild
	if(rebuild == 1){
		clearelement(container);
	}

	//get rounds
	let rounds = await getrounds(tid, mid); 
		
	//loop through rounds of matchday
	for(let i = 0; i < rounds.length; i++){
		buildsingleround(container, tid, mid, rounds[i].rid, i+1, rounds[i]["rcurrent"]);
	}
	
}

let buildroundsinit = (maincontainer, tid, mid) => {

	//create maincontainer for rounds 
	let maincontainerrounds = creatediv({
		appendto: maincontainer
	})

	//set container hidden
	maincontainerrounds.style.display = "none";

	//set data state to hidden 
	maincontainerrounds.setAttribute("data-state", "hidden");

	//create container for individual rounds
	let individualrounds = creatediv({
		appendto: maincontainerrounds
	});

	//create container for create button under individual rounds container
	let createbuttoncontainer = creatediv({
		appendto: maincontainerrounds
	});


	//create button to create new round
	let createroundcontainer = creatediv({
		divclass: ["navigationitem-2", "navigationhover"],
		appendto: createbuttoncontainer,
	})

	createroundcontainer.addEventListener("click", async () => {

		//create new ronud and return round number
		let rounddata = await createnewround(tid, mid);

		//append new round to navigation
		let rdata = {tid: tid, mid: mid, rid: rounddata.rid, rcurrent: 0};
		buildsingleround(individualrounds, rdata, rounddata.numberofrounds + 1, 0);

	});

	//create filler div
	creatediv({appendto: createroundcontainer});
	creatediv({appendto: createroundcontainer});
	//creatediv({appendto: createroundcontainer});

	// add rounds description icon container
	let createroundiconanddescription = creatediv({
		divclass: ["navigation-icon-description", "navigationitemhover"],
		appendto: createroundcontainer
	})

	//add icon to create round button
	let createroundicon = document.createElement("div");
	createroundicon.classList.add("icon-plus");
	createroundicon.classList.add("icon");
	createroundiconanddescription.appendChild(createroundicon);

	//add description to create round button
	let createrounddescription = creatediv({
		divtext: "Neu",
		divclass: ["flexleft", "navigationdescription"],
		appendto: createroundiconanddescription
	})

	return individualrounds;

}

let createnewround = async (tid, mid) => {

	//create json for php
	let postdata = {tid: tid, mid: mid};

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
	return phpresponse;

}

let buildworkspacetrackconfiguration = async (tid) => {

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
	let addtrackicon = document.createElement("div");
	addtrackicon.classList.add("icon-plus");
	addtrackicon.classList.add("icon");
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
		clearelement(container)
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

let buildworkspaceplayerconfig = async () => {
	
	//get workspace foot
	let workspacefoot = getworkspacefoot();

	//get workspace body
	let workspacebody = getworkspacebody();
	
	//clear workspace body and foot
	clearworkspacebody();
	clearworkspacefoot();

	//add class to workspace body
	workspacebody.classList.add("workspace-player-config");

	//create player button container
	let addplayercontainer = creatediv({
		divclass: ["flexcenter"],
		appendto: workspacebody
	});

	//add container for players table
	let playerstable = creatediv({
		appendto: workspacebody,
		divid: "workspace-players-table"
	});

	//add button to create new player
	let addplayersvg = document.createElement("div");
	addplayersvg.classList.add("icon-playerplus");
	addplayersvg.classList.add("icon");
	addplayersvg.classList.add("workspaceicon");
	addplayercontainer.appendChild(addplayersvg);
	addplayersvg.addEventListener("click", async () => {
		buildmodalcreateplayer(playerstable); 
		toggleoverlay(true);
	})

	await buildplayerstable(playerstable);
}

let buildworkspaceplayerintconfig = async (tid) => {
	
	//get workspace foot
	let workspacefoot = getworkspacefoot();

	//get workspace body
	let workspacebody = getworkspacebody();
	
	//clear workspace body and foot
	clearworkspacebody();
	clearworkspacefoot();

	//add class to workspace body
	workspacebody.classList.add("workspace-player-config");

	//create player button container
	let addplayercontainer = creatediv({
		divclass: ["flexcenter"],
		appendto: workspacebody
	});

	//add container for players table
	let playerstable = creatediv({
		appendto: workspacebody,
		divid: "workspace-players-table"
	});

	//add button to add player to tournament
	let addplayersvg = document.createElement("div");
	addplayersvg.classList.add("icon-playerplus");
	addplayersvg.classList.add("icon");
	addplayersvg.classList.add("workspaceicon");
	addplayercontainer.appendChild(addplayersvg);
	addplayersvg.addEventListener("click", async () => {
		buildmodaladdplayertotournament(tid, playerstable); 
	})

	await buildplayersintournamenttable(playerstable, tid);


}

let buildmodaladdplayertotournament = async (tid, playerstable) => {
	console.log(tid, playerstable);
	console.log(await getplayersnotintournament(tid)); 
	
	/*
	//turn on overlay
	toggleoverlay(true);

	//create modal
	let modal = createbasicmodal(
		"modal-add-player-to-group",
		"Spieler Gruppe hinzufuegen",
		"modal-add-player-to-group-layout"
	);

	//get all players which are currently not in a group for that track
	let players = await getplayersnotingroup(groupsdata)

	for(let i = 0; i < players.length; i++){
		let playercontainer = creatediv({
			appendto: modal.modalbody,
			divclass: ["addplayertogroup-playercontainer"]
		});

		//playernumber, surname, firstname
		for(let j = 0; j < 3; j++){

			creatediv({
				appendto: playercontainer,
				divtext: players[i][j]
			})

		}

		//create button to add player group
		let addplayertogroupbutton = document.createElement("div");
		addplayertogroupbutton.classList.add("icon-playerplus");
		addplayertogroupbutton.classList.add("icon");
		addplayertogroupbutton.classList.add("workspaceicon");
		playercontainer.appendChild(addplayertogroupbutton);
		
		//behaviour if add player button is clicked
		addplayertogroupbutton.addEventListener("click", async () => {
			//add player to current group
			await addplayertogroup(groupsdata.tid, groupid, players[i]["playernumber"]);		
		
			//rebuild list of players in background
			buildgroupplayers(playerscontainer, groupid);
			
			//remove player from list of available player
			playercontainer.remove();
		})


	}
	
	//make modal invsible if checkmark is clicked
	modal.acceptbutton.addEventListener("click", () => {
		changeelementvisibility(modal.modalcontainer, false, true);
		toggleoverlay(false);
	});
	*/
}

let clubsdropdown = async () => {

	//get clubs from database
	let clubs = await getclubs();

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

let genderdropdown = () => {
	let genderselect = document.createElement("select");	

	let options = {
		0: {id: "M", text: "M\u00e4nnlich"},
		1: {id: "M", text: "Weiblich"},
		2: {id: "D", text: "Divers"}
	}

	for(let i = 0; i < Object.keys(options).length; i++){
		let option = document.createElement("option");
		option.value = options[i].id;
		option.text = options[i].text;
		genderselect.appendChild(option);
	}

	return genderselect;

}

let buildplayerstable = async (container) => {
	//empty table
	clearelement(container);

	//get players
	let players = await getplayers();

	//loop through players and insert into tables
	for(let i = 0; i < players.length; i++){
		buildsingleplayer(container, players[i]);
	}
}

let buildplayersintournamenttable = async (container, tid) => {
	//empty table
	clearelement(container);

	//get players
	let players = await getplayersintournament(tid);

	//loop through players and insert into tables
	for(let i = 0; i < players.length; i++){
		buildsingleplayerintournament(container, players[i]);
	}
}

let getplayers = async () => {

	//call php script to fetch players
	let players = await fetch("/lib/administration/php/getplayers.php", {
		method: 'POST',
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	});

	//return players
	return players.json();

}

let getplayersintournament = async (tid) => {

	//call php script to fetch players
	let players = await fetch("/lib/administration/php/getplayersintournament.php", {
		method: 'POST',
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({tid: tid})
	});

	//return players
	return players.json();

}

let getplayersnotintournament = async (tid) => {

	debugger;
	//call php script to fetch players
	let players = await fetch("/lib/administration/php/getplayersnotintournament.php", {
		method: 'POST',
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({tid: tid})
	});

	//return players
	return players.json();

}

let getplayer = async (playernumber) => {

	let player = await fetch("/lib/administration/php/getplayer.php", {
		method: 'POST',
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({playernumber: playernumber})
	});

	return await player.json();
}

let buildsingleplayer = async (container, playerdata) => {
	//create row
	let row = creatediv({
		appendto: container,
		divclass: ["player-row"]
	});
	//add event listner to when to display player
	row.addEventListener("click", async () => {
		await buildmodaleditplayer(playerdata.playernumber);
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

let buildsingleplayerintournament = async (container, playerdata) => {
	//create row
	let row = creatediv({
		appendto: container,
		divclass: ["player-row-tournament"]
	});
	//add event listner to when to display player
	row.addEventListener("click", async () => {
		//await buildmodaleditplayer(playerdata.playernumber);
		//toggleoverlay(true);
	});

	//add playernumber
	creatediv({
		divtext: playerdata.playernumber,
		appendto: row
	});
	
	//add playernumber
	creatediv({
		divtext: playerdata.startnumber,
		appendto: row
	});

	/*
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
	*/
}

let buildmodalcreateplayer = async (playerstable) => {

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
	let clubssel = await clubsdropdown();
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
		playernumberinput.value = limitinput(5, playernumberinput);
	});

	//create label for gender 
	let genderlabel = creatediv({
		appendto: modal.modalbody,
		divtext: "Geschlecht"
	});

	//create input for gender 
	let genderinput = genderdropdown();
	modal.modalbody.appendChild(genderinput);

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

			//build table again
			await buildplayerstable(playerstable); 
		}
	});

}

let buildmodaleditplayer = async (playernumber) => {

	//create modal
	let modal = createbasicmodal(
		"modal-edit-player",
		"Spieler",
		"modal-edit-player-layout"
	);

	//get playerdata from db
	let playerdata = await getplayer(playernumber);

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
	let clubssel = await clubsdropdown();
	clubssel.value = playerdata["cid"];
	playerinfo.appendChild(clubssel);

	//create label for playernumber 
	let playernumberlabel = creatediv({
		appendto: playerinfo,
		divtext: "Spielernummer"
	});

	//create input for playernumber 
	let playernumberinput = creatediv({
		divtext: playerdata["playernumber"],
		appendto: playerinfo
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
		deleteplayer(modal.modalcontainer, playerdata.playernumber);
	});

	//add event listner to accept button
	//update player
	modal.acceptbutton.addEventListener("click", async () => {
		//create json for php
		playerdata = {
			cid: clubssel.value,
			playernumber: playerdata["playernumber"],
			gender: genderinput.value,
			surname: surnameinput.value,
			firstname: firstnameinput.value
		}

		updateplayer(playerdata, modal.modalcontainer);

		
	});
}

let buildworkspaceviewmatchday = (matchdayscontainer, mdcontainer, tid, mid, matchdayicon) => {
	
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
	let matchdayinformationicon = document.createElement("div");
	matchdayinformationicon.classList.add("icon-info");
	matchdayinformationicon.classList.add("icon");
	matchdayinformationicon.classList.add("workspaceicon");
	workspaceheadvariable.appendChild(matchdayinformationicon);
	matchdayinformationicon.addEventListener("click", () => {
		//displays matchday information
		buildworkspacematchdayinformation(tid, mid, matchdayicon);
	})

	//create icon for matchday deletion 
	let matchdaydeletionicon = document.createElement("div");
	matchdaydeletionicon.classList.add("icon-garbage");
	matchdaydeletionicon.classList.add("icon");
	matchdaydeletionicon.classList.add("workspaceicon");
	workspaceheadvariable.appendChild(matchdaydeletionicon);
	matchdaydeletionicon.addEventListener("click", async () => {
		
		await deletematchday(tid, mid);
		
		//remove rounds contianer of matchday		
		mdcontainer.nextElementSibling.remove(); 
		//remove container of matchday
		mdcontainer.remove(); 

		//number of containers in tournament for matchdays/rounds
		let numberofmatchdays = matchdayscontainer.childNodes.length - 1;

		//counter for matchday numbering
		let currentmdnumber = 1;

		//loop through containers and renumber the matchday description
		for(let i = 0; i < numberofmatchdays; i += 2){
			//get container
			let matchdaydes = matchdayscontainer.childNodes[i].childNodes[1].childNodes[1];	
			//set matchday text
			matchdaydes.innerHTML = "Spieltag " + currentmdnumber;

			//increase current md number
			currentmdnumber++;

		}

		//close workspace
		closeworkspace();

	})


	buildworkspacematchdayinformation(tid, mid, matchdayicon);

}

let buildworkspacematchdayinformation = async (tid, mid, matchdayicon) => {

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
	let matchdayinformation = await getmatchday(tid, mid);

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
		var divclass = "icon-toggleoff";
	}else if(matchdayinformation.mdcurrent == 1){
		activemd.innerHTML = "X";
		var divclass = "icon-toggleon";
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
	let setcurrentbutton = document.createElement("div");
	setcurrentbutton.classList.add(divclass);
	setcurrentbutton.classList.add("icon");
	setcurrentbuttoncontainer.appendChild(setcurrentbutton);
	setcurrentbutton.addEventListener("click", async () => {

		//if md is not actifve, allows to activate
		if(matchdayinformation.mdcurrent == 0){
			let activate = await setmdactive(tid, mid);
			//if md was succsessfully activated
			//change icon and set X
			if(activate == 0){
				//if matchday is currently not active, set toggle button to on
				setcurrentbutton.classList.remove("icon-toggleoff");
				setcurrentbutton.classList.add("icon-toggleon");
				activemd.innerHTML = "X";

				replaceclassindoc("icon-matchday-active", "icon-matchday");
				replaceclassindoc("icon-round-active", "icon-round");
				matchdayicon.classList.remove("icon-matchday");
				matchdayicon.classList.add("icon-matchday-active");

			}
		}

	});

	//container to display informtion about rounds in matchday
	let matchdayroundsinformation = creatediv({
		divclass: ["workspace-view-maytchdayinformation-roundsoverview"],
		appendto: workspacebody
	});

	//get number of rounds of that matchday from database
	let numberofrounds = await getnumberofrounds(tid, mid);

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
	let doneicon = document.createElement("div");
	doneicon.setAttribute("src", "lib/assets/done.svg");
	doneicon.classList.add("icon-checkmark");
	doneicon.classList.add("icon");
	doneicon.classList.add("workspaceicon");
	donebuttoncontainer.appendChild(doneicon);

	//add eventlistner to done button
	donebuttoncontainer.addEventListener("click", () =>{

		//data of matchday
		let mddata = {
			tid: tid,
			mid: mid,
			mddescription: mddescription.value
		}

		updatematchday(mddata);
	})

}

let getnumberofrounds = async (tid, mid) => {
	let phpinput = {tid: tid, mid: mid};


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
	let updatemd = await fetch("/lib/administration/php/updatematchday.php", {
		method: 'POST',
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(mddata)
	});

	//php response
	let phpresponse = await updatemd.json();

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

let deleteplayer = async (modal, tid, cid, playernumber) => {

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

let setmdactive = async (tid, mid) => {

	mddata = {
		tid: tid,
		mid: mid,
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

let deletematchday = async (tid, mid) => {

	mddata = {
		tid: tid,
		mid: mid,
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

let buildworkspaceviewround = async (roundscontainer, roundcontainer, rdata, roundicon) => {

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
	let roundinformationicon = document.createElement("div");
	roundinformationicon.classList.add("icon-info");
	roundinformationicon.classList.add("icon");
	roundinformationicon.classList.add("workspaceicon");
	workspaceheadvariable.appendChild(roundinformationicon);
	roundinformationicon.addEventListener("click", () => {
		//displays round information
		buildworkspaceroundinformation(rdata, roundicon);
	})

	//create icon for startgroups 
	let roundstartgroupsicon = document.createElement("div");
	roundstartgroupsicon.classList.add("icon-playdouble");
	roundstartgroupsicon.classList.add("icon");
	roundstartgroupsicon.classList.add("workspaceicon");
	workspaceheadvariable.appendChild(roundstartgroupsicon);
	roundstartgroupsicon.addEventListener("click", () => {
		//displays round information
		buildworkspaceroundstartgroups(rdata);
	})

	//create icon for round deletion 
	let rounddeletionicon = document.createElement("div");
	rounddeletionicon.classList.add("icon-garbage");
	rounddeletionicon.classList.add("icon");
	rounddeletionicon.classList.add("workspaceicon");
	workspaceheadvariable.appendChild(rounddeletionicon);
	rounddeletionicon.addEventListener("click", async () => {

		await deleteround(rdata);
		
		//remove container of round
		roundcontainer.remove(); 

		//number round containers in matchday
		let numberofrounds = roundscontainer.childNodes.length;

		//counter for round numbering
		let currentroundnumber = 1;

		//loop through containers and renumber the round description
		for(let i = 0; i < numberofrounds; i++){
			//get container
			let rounddes = roundscontainer.childNodes[i].childNodes[2].childNodes[1];	
			//set round text text
			rounddes.innerHTML = "Runde " + currentroundnumber;

			//increase current round number
			currentroundnumber++;

		}

		//close workspace
		closeworkspace();
		
	})

	buildworkspaceroundinformation(rdata, roundicon);
}

let buildworkspaceroundinformation = async (rdata, roundicon) => {

	//get workspace body
	let workspacebody = getworkspacebody();

	//get workspace foot
	let workspacefoot = getworkspacefoot();
	
	//clear workspace body and foot
	clearworkspacebody();
	clearworkspacefoot();
	
	//add class to workspace body
	workspacebody.classList.add("workspace-view-roundinformation-body");

	//get round information from database
	let roundinformation = await getround(rdata["tid"], rdata["mid"], rdata["rid"]);

	//container to store information about basic round information
	let roundinfoinputcontainer = creatediv({
		appendto: workspacebody,
		divclass: ["workspace-view-roundinformation-input-container"]
	});

	//label for round number
	let labelmdnumber = creatediv({
		appendto: roundinfoinputcontainer,
		divtext: "Nummer:"
	});

	//round number
	let rnumberdisplay = creatediv({
		appendto: roundinfoinputcontainer,
		divtext: roundinformation["rnumber"]
	});
	
	//label for round description
	let rdescriptionlabel = creatediv({
		appendto: roundinfoinputcontainer,
		divtext: "Beschreibung:"
	});

	//round description input
	let rdescription = creatediv({
		type: "INPUT",
		appendto: roundinfoinputcontainer,
		divtext: roundinformation["rdescription"]
	});
	rdescription.value = roundinformation["rdescription"];

	//label for active round
	let activelabel = creatediv({
		appendto: roundinfoinputcontainer,
		divtext: "Aktive Runde"
	});

	let activer = creatediv({
		appendto: roundinfoinputcontainer
	});
		
	//set x if current round
	if(roundinformation.rcurrent == 0){
		activer.innerHTML = "-";
		var divclass = "icon-toggleoff";
	}else if(roundinformation.rcurrent == 1){
		activer.innerHTML = "X";
		var divclass = "icon-toggleon";
	}

	//lable for md activation
	creatediv({
		appendto: roundinfoinputcontainer,
		divtext: "Runde aktiv setzen"
	});

	//create container for button
	let setcurrentbuttoncontainer = creatediv({
		appendto: roundinfoinputcontainer
	});

	//button to set round current
	let setcurrentbutton = document.createElement("div");
	setcurrentbutton.classList.add(divclass);
	setcurrentbutton.classList.add("icon");
	setcurrentbuttoncontainer.appendChild(setcurrentbutton);
	setcurrentbutton.addEventListener("click", async () => {

		//if round is not actifve, allows to activate
		if(roundinformation.rcurrent == 0){

			let rounddata = {
				tid: roundinformation.tid,
				mid: roundinformation.mid,
				rid: roundinformation.rid
			}

			let activate = await setractive(rounddata);
			//if round was succsessfully activated
			//change icon and set X
			if(activate == 0){
				//if round is currently not active, set toggle button to on
				setcurrentbutton.classList.remove("icon-toggleoff");
				setcurrentbutton.classList.add("icon-toggleon");
				activer.innerHTML = "X";

				replaceclassindoc("icon-round-active", "icon-round");
				roundicon.classList.remove("icon-round");
				roundicon.classList.add("icon-round-active");

			}
		}

	});

	//label for init button
	let labelinitrounds = creatediv({
		appendto: roundinfoinputcontainer,
		divtext: "Runde Initializieren"
	});

	//add round initialization button
	let initbutton = document.createElement("div");
	initbutton.classList.add("icon-init");
	initbutton.classList.add("icon");
	initbutton.classList.add("workspaceicon");
	roundinfoinputcontainer.appendChild(initbutton);

	initbutton.addEventListener("click", async () => {
		initround(tid, mid, rid);	
	});

	//create container for done button
	let donebuttoncontainer = creatediv({
		appendto: workspacefoot,
		divid: "administrationworkspacedonecontainer"
	})

	//add done button
	let doneicon = document.createElement("div");
	doneicon.classList.add("icon-checkmark");
	doneicon.classList.add("icon");
	doneicon.classList.add("workspaceicon");
	donebuttoncontainer.appendChild(doneicon);

	//add eventlistner to done button
	donebuttoncontainer.addEventListener("click", () =>{

		//update round information
		updateround(tid, mid, rid, rdescription.value);
	})

}

let updateround = async (tid, mid, rid, rdescription)=> {

	//data of round
	let rdata = {
		tid: tid,
		mid: mid,
		rid: rid,
		rdescription: rdescription
	}

	//call php script
	let phppath = "/lib/administration/php/updateround.php";
	let updateround = await fetch(phppath, {
		method: 'POST',
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(rdata)
	});

	//php response
	let phpresponse = await updateround.json();
	
	return phpresponse;
}


let deleteround = async (rdata) => {

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

let getround = async (tid, mid, rid) => {

	//set data for php script
	let requestdata = {tid: tid, mid: mid, rid: rid};

	//call php script 
	let phpresponse = await fetch("/lib/administration/php/getround.php", {
		method: 'POST',
		headers: {
			'Accept': 'application/jsono',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(requestdata)
	});

	//variable for php response
	let response = await phpresponse.json();

	//return round
	return response;
}

let setractive = async (rounddata) => {

	rdata = {
		tid: rounddata.tid,
		mid: rounddata.mid,
		rid: rounddata.rid,
		rcurrent: 1
	}

	//call php script
	let phppath = "/lib/administration/php/setrcurrent.php";
	let activer = await fetch(phppath, {
		method: 'POST',
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(rdata)
	});

	//php response
	let phpresponse = await activer.json();
	
	return phpresponse["result"];

}

let buildworkspaceroundstartgroups = async (rdata) => {

	//get workspace body
	let workspacebody = getworkspacebody();

	//get workspace foot
	let workspacefoot = getworkspacefoot();
	
	//clear workspace body and foot
	clearworkspacebody();
	clearworkspacefoot();
	
	//add class to workspace body
	workspacebody.classList.add("workspace-view-roundstartgroups-body");
	
	let trackselectioncontainer = creatediv({
		appendto: workspacebody,
		divclass: ["workspace-trackselection-container"]
	});

	let trackstartgroupscreatecontainer = creatediv({
		appendto: workspacebody,
	})

	let trackstartgroupslist = creatediv({
		appendto: workspacebody,
		divid: "trackstartgroupslist"
	})
	
	//get tracks from db
	let tracks = await gettracks(rdata["tid"]);

	for(let i = 0; i < tracks.length; i++){
		let tracklabel = creatediv({
			appendto: trackselectioncontainer,
			divtext: tracks[i].label,
			divclass: ["startgroupstracklabel", "flexcenter"]
		})

		//behaviour if track is clicked
		tracklabel.addEventListener("click", async () => {
			//make visible track is selected
			setselectednavigation(tracklabel, "track");

			//change cursor behviour to not be pointer
			tracklabel.style.pointerEvents = "none";

			let buildgroupsdata = {
				creategroupcontainer: trackstartgroupscreatecontainer,
				groupslistcontainer: trackstartgroupslist,
				tid: rdata["tid"],
				trackid: tracks[i].trackid,
				mid: rdata["mid"],
				rid: rdata["rid"]
			}

			//on click build groups for the track
			await buildtrackstartgroups(buildgroupsdata);

			tracklabel.style.pointerEvents = "auto";

		})
	}

}


let buildtrackstartgroups = async (groupsdata) => {

		clearelement(groupsdata.creategroupcontainer);
		clearelement(groupsdata.groupslistcontainer);

		//create button to create new empty group
		let creategroupbutton = document.createElement("div");
		creategroupbutton.classList.add("icon-plus");
		creategroupbutton.classList.add("icon");
		creategroupbutton.classList.add("workspaceicon");
		groupsdata.creategroupcontainer.appendChild(creategroupbutton);
		
		//behviour if created group button is clicked
		creategroupbutton.addEventListener("click", async () => {
			//create new empty group
			await createnewgroup(groupsdata);
			//rebuild start groups table
			await buildstartgroupstable(groupsdata);
		})

		//build start groups table
		await buildstartgroupstable(groupsdata);

	}

let createnewgroup = async (groupsdata) => {

	let phppath = "/lib/administration/php/creategroup.php";

	let createnewgroup = await fetch(phppath, {
		method: 'POST',
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(groupsdata)
	});

	//php response
	let phpresponse = await createnewgroup.json();
	
}

let getstartgroups = async (groupsdata) => {

	let phppath = "/lib/administration/php/getstartgroups.php";

	let createnewgroup = await fetch(phppath, {
		method: 'POST',
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(groupsdata)
	});

	//php response
	let phpresponse = await createnewgroup.json();

	return phpresponse;
}

var trackgroupsbeingbuild = false;

let buildstartgroupstable = async (groupsdata) => {
	
	if(trackgroupsbeingbuild){
		return;
	};

	trackgroupsbeingbuild = true;
	
	//clear list
	clearelement(groupsdata.groupslistcontainer);

	//get groups from db
	let groups = await getstartgroups(groupsdata);

	//loop through groups and build table
	for(let i = 0; i < groups.length; i++){

		let groupdata = {
			groupid: groups[i].groupid,
			tid: groups[i].tid,
			trackid: groups[i].trackid,
			mid: groups[i].mid,
			rid: groups[i].rid,
			grouporder: groups[i].grouporder
		}

		//container showing group basic data
		let groupcontainer = creatediv({
			appendto: groupsdata.groupslistcontainer,
			divclass: ["trackstartgroupcontainer"]
		});

		//contaienr showing players withing group
		let playerscontainer = creatediv({
			appendto: groupsdata.groupslistcontainer,
		});

		//create container for expand/collapse control
		let expandcontainer = creatediv({
			appendto: groupcontainer,
			divclass: ["expandcontainer", "flexcenter"]
		})
		expandcontainer.setAttribute("data-state", "expanded");
		
		//create svg for expand/collapse control
		let polygonsvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		polygonsvg.setAttribute("viewBox", "0 0 20 20");
		polygonsvg.setAttribute("height", "20px");
		polygonsvg.setAttribute("width", "20px");
		expandcontainer.appendChild(polygonsvg);

		//create new triangle
		let polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
		polygon.setAttribute("points", "5,8 10,13 15,8");
		polygon.setAttribute("fill", "#5f6368");	
		polygonsvg.appendChild(polygon);

		//eventlisnter for on click on triangle
		//hide/show group players
		polygonsvg.addEventListener("click", () => {
			
			//change polygon
			expandcollapseicon(expandcontainer, polygon);
			

			//get players container sate
			let playercontainersstate = playerscontainer.getAttribute("data-state");
			
			if(playercontainersstate == "hidden"){
				//make matchdays invsible
				changeelementdisplay(playerscontainer, "block");
				playerscontainer.setAttribute("data-state", "visible");
			}else{
				changeelementdisplay(playerscontainer, "none");
				playerscontainer.setAttribute("data-state", "hidden");
			}
			
		})

		//container for start order of group
		let groupordernumber = creatediv({
			appendto: groupcontainer,
			divtext: i + 1,
			divclass: ["flexcenter"]
		})
		

		//move player up/down
		let changeorderplayercontainer = creatediv({
			appendto: groupcontainer,
			divclass: ["track-group-player-move-container"]
		});

		//make move buttons only visible if hoverd over group
		changeopacityonhover(groupcontainer, changeorderplayercontainer);

		//create svg for moving group up
		let polygonsvgup = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		polygonsvgup.setAttribute("viewBox", "0 0 20 20");
		polygonsvgup.setAttribute("height", "15");
		polygonsvgup.setAttribute("width", "30");
		changeorderplayercontainer.appendChild(polygonsvgup);

		//create new triangle
		let polygonup = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
		polygonup.setAttribute("points", "5,13 10,8 15,13");
		polygonup.setAttribute("fill", "#5f6368");	
		polygonsvgup.appendChild(polygonup);

		//add eventlistner to move group up
		polygonsvgup.addEventListener("click", async () => {

			
			let groupmove = await changegrouporder(1, groupdata);

			if(groupmove.result == 0){
				await buildstartgroupstable(groupsdata);
			}
		});

		//create svg for moving group up/down
		let polygonsvgdown = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		polygonsvgdown.setAttribute("viewBox", "0 0 20 20");
		polygonsvgdown.setAttribute("height", "15");
		polygonsvgdown.setAttribute("width", "30");
		changeorderplayercontainer.appendChild(polygonsvgdown);

		//create new triangle
		let polygondown = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
		polygondown.setAttribute("points", "15,8 10,13 5,8");
		polygondown.setAttribute("fill", "#5f6368");	
		polygonsvgdown.appendChild(polygondown);

		//add eventlistner to move group up
		polygonsvgdown.addEventListener("click", async () => {

			let groupmove = await changegrouporder(0, groupdata);

			if(groupmove.result == 0){
				await buildstartgroupstable(groupsdata);
			}
		});

		//button to add player to group
		let addplayertogroupbuttoncontainer = creatediv({
			appendto: groupcontainer,
			divclass: ["startgroupsbuttoncontainer"]
		})
		
		//create button to add player group
		let addplayertogroupbutton = document.createElement("div");
		addplayertogroupbutton.setAttribute("src", "lib/assets/addplayergroup.svg");
		addplayertogroupbutton.classList.add("icon-playerplus");
		addplayertogroupbutton.classList.add("icon");
		addplayertogroupbutton.classList.add("workspaceicon");
		addplayertogroupbuttoncontainer.appendChild(addplayertogroupbutton);
		
		addplayertogroupbutton.addEventListener("click", async () => {

			await addplayertogroupmodal(groupsdata, playerscontainer, groups[i]["groupid"]);
		})

		//only show button when mous hovers over group
		changeopacityonhover(groupcontainer, addplayertogroupbuttoncontainer);

		//filler div
		creatediv({
			appendto: groupcontainer,
		});

		//container for delte group button
		let removegroupbuttoncontainer = creatediv({
			appendto: groupcontainer,
			divclass: ["startgroupsbuttoncontainer"]
		})

		//button to delete group and players
		let deletegroupbutton = document.createElement("div");
		deletegroupbutton.classList.add("icon-clubminus");
		deletegroupbutton.classList.add("icon");
		deletegroupbutton.classList.add("workspaceicon");
		removegroupbuttoncontainer.appendChild(deletegroupbutton);
		
		deletegroupbutton.addEventListener("click", async () => {

			await removegroup(groupsdata, groups[i]["groupid"], groupcontainer, playerscontainer);	
			await buildstartgroupstable(groupsdata);
		})

		changeopacityonhover(groupcontainer, removegroupbuttoncontainer);


		//add players to group
		await buildgroupplayers(playerscontainer, groups[i]["groupid"]);

	}

	trackgroupsbeingbuild = false;

}

let buildgroupplayers = async (container, groupid) => {

	clearelement(container);

	let groupplayers = await getplayersingroup(groupid);

	for(let j = 0; j < groupplayers.length; j++){

		let playerdata = {
			playerstartorder: j+1,
			playerorderdb: groupplayers[j]["playerorder"],
			playernumber: groupplayers[j]["playernumber"],
			surname: groupplayers[j]["surname"],
			firstname: groupplayers[j]["firstname"],
			groupid: groupid
		}

		await startgroupsinsertplayer(container, groupid, playerdata);
	}

}

let startgroupsinsertplayer = async (container, groupid, playerdata) => {

	let playercontainer = creatediv({
		appendto: container,
		divclass: ["track-group-player-container"]
	})

	//player start order
	creatediv({
		appendto: playercontainer,
		divtext: playerdata.playerstartorder 
	});

	//move player up/down
	let changeorderplayercontainer = creatediv({
		appendto: playercontainer,
		divclass: ["track-group-player-move-container"]
	});
	
	//create svg for moving player up
	let polygonsvgup = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	polygonsvgup.setAttribute("viewBox", "0 0 20 20");
	polygonsvgup.setAttribute("height", "15");
	polygonsvgup.setAttribute("width", "30");
	changeorderplayercontainer.appendChild(polygonsvgup);

	//create new triangle
	let polygonup = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
	polygonup.setAttribute("points", "5,13 10,8 15,13");
	polygonup.setAttribute("fill", "#5f6368");	
	polygonsvgup.appendChild(polygonup);

	//add eventlistner to move player up
	polygonsvgup.addEventListener("click", async () => {
		let playermove = await changeplayerorder(1, playerdata.groupid, playerdata.playernumber, playerdata.playerorderdb);

		if(playermove.result == 0){
			await buildgroupplayers(container, groupid);
		}
	});

	//create svg for moving player down 
	let polygonsvgdown = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	polygonsvgdown.setAttribute("viewBox", "0 0 20 20");
	polygonsvgdown.setAttribute("height", "15");
	polygonsvgdown.setAttribute("width", "30");
	changeorderplayercontainer.appendChild(polygonsvgdown);

	//create new triangle
	let polygondown = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
	polygondown.setAttribute("points", "15,8 10,13 5,8");
	polygondown.setAttribute("fill", "#5f6368");	
	polygonsvgdown.appendChild(polygondown);

	//add eventlistner to move player up
	polygonsvgdown.addEventListener("click", async () => {
		let playermove = await changeplayerorder(0, playerdata.groupid, playerdata.playernumber, playerdata.playerorderdb);

		if(playermove.result == 0){
			await buildgroupplayers(container, groupid);
		}
	});

	//playernumber
	creatediv({
		appendto: playercontainer,
		divtext: playerdata.playernumber
	});

	//surname
	creatediv({
		appendto: playercontainer,
		divtext: playerdata.surname
	});

	//firstname
	creatediv({
		appendto: playercontainer,
		divtext: playerdata.firstname
	});

	//container for player remove button
	let removeplayerfromgroupbuttoncontainer = creatediv({
		appendto: playercontainer,
		divclass: ["startgroupsbuttoncontainer"]
	})

	//create button to remove player from group
	let removeplayerfromgroupbutton = document.createElement("div");
	removeplayerfromgroupbutton.classList.add("icon-playerminus");
	removeplayerfromgroupbutton.classList.add("icon");
	removeplayerfromgroupbutton.classList.add("workspaceicon");
	removeplayerfromgroupbuttoncontainer.appendChild(removeplayerfromgroupbutton);

	removeplayerfromgroupbutton.addEventListener("click", async () => {

		await removeplayerfromgroup(playerdata.groupid, playerdata.playernumber);
		await buildgroupplayers(container, playerdata.groupid);
	})

	changeopacityonhover(playercontainer, removeplayerfromgroupbuttoncontainer);
	changeopacityonhover(playercontainer, changeorderplayercontainer);
}

let addplayertogroupmodal = async (groupsdata, playerscontainer, groupid) => {
	
	//turn on overlay
	toggleoverlay(true);

	//create modal
	let modal = createbasicmodal(
		"modal-add-player-to-group",
		"Spieler Gruppe hinzufuegen",
		"modal-add-player-to-group-layout"
	);

	//get all players which are currently not in a group for that track
	let players = await getplayersnotingroup(groupsdata)

	for(let i = 0; i < players.length; i++){
		let playercontainer = creatediv({
			appendto: modal.modalbody,
			divclass: ["addplayertogroup-playercontainer"]
		});

		//playernumber, surname, firstname
		for(let j = 0; j < 3; j++){

			creatediv({
				appendto: playercontainer,
				divtext: players[i][j]
			})

		}

		//create button to add player group
		let addplayertogroupbutton = document.createElement("div");
		addplayertogroupbutton.classList.add("icon-playerplus");
		addplayertogroupbutton.classList.add("icon");
		addplayertogroupbutton.classList.add("workspaceicon");
		playercontainer.appendChild(addplayertogroupbutton);
		
		//behaviour if add player button is clicked
		addplayertogroupbutton.addEventListener("click", async () => {
			//add player to current group
			await addplayertogroup(groupsdata.tid, groupid, players[i]["playernumber"]);		
		
			//rebuild list of players in background
			buildgroupplayers(playerscontainer, groupid);
			
			//remove player from list of available player
			playercontainer.remove();
		})


	}
	
	//make modal invsible if checkmark is clicked
	modal.acceptbutton.addEventListener("click", () => {
		changeelementvisibility(modal.modalcontainer, false, true);
		toggleoverlay(false);
	});
	
}

let addplayertogroup = async (tid, groupid, playernumber) => {

	phpdata = {
		tid: tid,
		groupid: groupid,
		playernumber: playernumber,
	}

	let phppath = "/lib/administration/php/addplayertogroup.php";

	let addplayertogroup = await fetch(phppath, {
		method: 'POST',
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(phpdata)
	});

	//php response
	let phpresponse = await addplayertogroup.json();

	return phpresponse;
}

let getplayersnotingroup = async (groupsdata) => {


	let phppath = "/lib/administration/php/getplayersnotingroup.php";

	let addplayertogroup = await fetch(phppath, {
		method: 'POST',
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(groupsdata)
	});

	//php response
	let phpresponse = await addplayertogroup.json();

	return phpresponse;

}

let getplayersingroup = async (groupid) => {
	
	phpdata = {
		groupid: groupid
	}

	let phppath = "/lib/administration/php/getgroupplayers.php";

	let addplayertogroup = await fetch(phppath, {
		method: 'POST',
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(phpdata)
	});

	//php response
	let phpresponse = await addplayertogroup.json();

	return phpresponse;
}

let removeplayerfromgroup = async (groupid, playernumber) => { 

	phpdata = {
		groupid: groupid,
		playernumber: playernumber

	}

	let phppath = "/lib/administration/php/removeplayerfromgroup.php";

	let addplayertogroup = await fetch(phppath, {
		method: 'POST',
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(phpdata)
	});

	//php response
	let phpresponse = await addplayertogroup.json();

	return phpresponse;
}

let removegroup = async (groupsdata, groupid, groupcontainer, playercontainer) => {

	phpdata = {
		tid: groupsdata.tid,
		trackid: groupsdata.trackid,
		mid: groupsdata.mid,
		rid: groupsdata.rid,
		groupid: groupid

	}

	let phppath = "/lib/administration/php/deletegroup.php";

	let addplayertogroup = await fetch(phppath, {
		method: 'POST',
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(phpdata)
	});

	//php response
	let phpresponse = await addplayertogroup.json();

	//remove container of group
	groupcontainer.remove();

	//remove container of players
	playercontainer.remove();

	return phpresponse;


}

let changeopacityonhover = (divhover, divopacity) => {

	divhover.addEventListener("mouseover", () => {

		changeopacity(divopacity, 100);
	});

	divhover.addEventListener("mouseout", () => {

		changeopacity(divopacity, 0);
	});
}

let changeplayerorder = async (direction, groupid, playernumber, playerorder) => {

	phpdata = {
		direction: direction,
		groupid: groupid,
		playernumber: playernumber,
		playerorder: playerorder
	}

	let phppath = "/lib/administration/php/changeplayerorder.php";

	let moveplayer = await fetch(phppath, {
		method: 'POST',
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(phpdata)
	});

	//php response
	let phpresponse = await moveplayer.json();

	return phpresponse;
}

let changegrouporder = async (direction, groupdata) => {
	
	groupdata.direction = direction;

	let phppath = "/lib/administration/php/changegrouporder.php";

	let movegroup = await fetch(phppath, {
		method: 'POST',
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(groupdata)
	});

	//php response
	let phpresponse = await movegroup.json();

	return phpresponse;
}

let getcurrenttournament = async () => {

	let phppath = "/lib/administration/php/getcurrenttournament.php";

	let currenttournament = await fetch(phppath, {
		method: 'POST',
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify()
	});

	//php response
	currenttournament = await currenttournament.json();

	return currenttournament;

}

let settcurrent = async (tid) => {

	tdata = {
		tid: tid,
	}

	//call php script
	let phppath = "/lib/administration/php/settcurrent.php";
	let activet = await fetch(phppath, {
		method: 'POST',
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(tdata)
	});

	//php response
	let phpresponse = await activet.json();
	
	return phpresponse["result"];

}

let setcurrenttournamentnameheader = (tname) => {
	let container = getcurrenttournamentnameheadercontainer();
	container.innerHTML = tname;
}

let getcurrenttournamentnameheadercontainer = () => {
	let container = document.getElementById("headercurrenttournamentname");
	return container;
}

let initround = async (tid, mid, rid) => {

	rdata = {
		tid: tid,
		mid: mid,
		rid: rid,
	}

	//call php script
	let phppath = "/lib/administration/php/initround.php";
	let initround = await fetch(phppath, {
		method: 'POST',
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(rdata)
	});

	//php response
	let phpresponse = await initround.json();
	
	return phpresponse["result"];
}

let replaceclassindoc = (currentclass, newclass) => {
	let elements = document.querySelectorAll("." + currentclass);
	for(let i = 0; i < elements.length; i++){
		elements[i].classList.remove(currentclass);	
		elements[i].classList.add(newclass);
	}

}

let buildtournamentsdropdown = async () => {

	let tournaments = await gettournaments();

	//create dropdown selection for tournaments
	let tournamentselection = document.createElement("select");
	tournamentselection.setAttribute("id", "t-select-dropdown");

	for(let i = 0; i < tournaments.length; i++){
		let option = document.createElement("option");
		option.value = tournaments[i]["tid"];
		option.text = tournaments[i]["tname"];
		tournamentselection.appendChild(option);

		if(tournaments[i]["active"] = "1"){
			tournamentselection.value = tournaments[i]["tid"];
		}
	}

	tournamentselection.addEventListener("change", async () => {
		//close current workspace
		closeworkspace();
		//deselect in navigation
		deselectallnavigation("selectednavigation");
		//build tournament data
		await buildvariablenavigation(tournamentselection.value);
		//view tournament information
		await buildworkspaceviewtournament(tournamentselection.value);
	});
	
	return tournamentselection;

}

let gettournamentdata = async (tid) => {
	tid = {tid: tid};
	let phppath = "/lib/administration/php/gettournamentdata.php";
	let tdata = await fetch(phppath, {
		method: 'POST',
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(tid)
	});

	//php response
	let phpresponse = await tdata.json();
	
	return phpresponse;

}

DOMready(buildheader);
DOMready(buildnavigation);
DOMready(buildworkspace);

DOMready(addEventListeners);
