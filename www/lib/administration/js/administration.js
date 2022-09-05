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
		tournamenticonanddescription.addEventListener("click", () => {
			setselectednavigation(tournament);
			buildworkspaceviewtournament(tournaments[i]["tid"], tournamentname);
		})

		//-------------------------------BUILD MATCHDAYS--------------------------------	
		let matchdays = await getmatchdays(tournaments[i]["tid"])

		console.log(matchdays);
		//create maincontainer for matchdays

		let maincontainermatchdays = creatediv({
			appendto: maincontainer
		})
		//set container hidden
		maincontainermatchdays.style.display = "none";
		//set data state to hidedn
		maincontainermatchdays.setAttribute("data-state", "hidden");

		//loop through matchdays
		for(let j = 0; j < matchdays.length; j++){
			let matchdaycontainer = creatediv({
				divclass: ["navigationitem-1", "navigationhover"],
				appendto: maincontainermatchdays,
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
				divtext: "Spieltag " + matchdays[j]["mdnumber"],
				divclass: ["flexleft", "navigationdescription"],
				appendto: matchdayiconanddescription
			})

			//add event lisnter if tournmant is selected
			matchdayiconanddescription.addEventListener("click", () => {
				setselectednavigation(matchdaycontainer);
				
				//TODO build workspace view matchday
				//buildworkspaceviewtournament(tournaments[i]["tid"], matchdaynumber);
			})

			


			//-------------------------------BUILD ROUNDS-----------------------------------


			

			//------------------------------------------------------------------------------



		}

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

		//add matchday name
		let creatematchdaydescription = creatediv({
			divtext: "Neu",
			divclass: ["flexleft", "navigationdescription"],
			appendto: creatematchdayiconanddescription
		})




		//------------------------------------------------------------------------------


		//add event listener for expand/collapse control
		polygonsvg.addEventListener("click", () => {
			
			//change polygon
			expandcollapseicon(expandcontainer, polygon);
			
			let matchdaysstate = maincontainermatchdays.getAttribute("data-state");

			if(matchdaysstate == "hidden"){
				//make matchdays invsible
				changeelementdisplay(maincontainermatchdays, "block");
				maincontainermatchdays.setAttribute("data-state", "visible");
			}else{
				changeelementdisplay(maincontainermatchdays, "none");
				maincontainermatchdays.setAttribute("data-state", "hidden");
			}
			
		})

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
		
		/*
		//if create tournament was already clicked, do nothing
		if(iscurrentlyselected(createtournamentcontainer)){return;}
		
		//set create tournamnt as selected button
		setselectednavigation(createtournamentcontainer);
		*/

		//---------------------------------------------------------------------------
		if(document.getElementById("modal-create-tournament") == undefined){
			buildmodalcreatetournament();
		}else{
			changeelementvisibility(document.getElementById("modal-create-tournament"), true, true);
			toggleoverlay(true);
		}
		//---------------------------------------------------------------------------
		
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
		changeelementvisibility(workspace, false, false);
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

		//give altert to user, that tournament has been created
		alert(phpresponse["message"]);

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
		fillclubstable(tid);
		
		

		//deactivate modal and overlay
		changeelementvisibility(modalcontainer, false, true);
		toggleoverlay(false);

		//alert user, that club was deleted
		alert("Verein angelegt");

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
	tournamentinformationicon.addEventListener("click", () => {
		buildworkspacetournamentinformation(id, tournamentnamediv);
	})

	//create icon for track configuration
	let trackconfig = document.createElement("img");
	trackconfig.setAttribute("src", "lib/assets/track.svg");
	trackconfig.classList.add("workspaceicon");
	workspaceheadvariable.appendChild(trackconfig);
	trackconfig.addEventListener("click", () => {
		//TODO config for tracks
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
		//TODO config for players
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
	//buildworkspacetournamentinformation(id, tournamentnamediv);
	buildworkspaceclubinformation(id);

}

let buildworkspacetournamentinformation = async (id, tournamentnamediv) => {
		
	//get tournament information from database
	let tournamentinformation = await gettournament(id);

	//get workspace foot
	let workspacefoot = getworkspacefoot();

	//get workspace body
	let workspacebody = getworkspacebody();
	
	//clear workspace body and foot
	clearworkspacebody();
	clearworkspacefoot();
	
	//add class to workspace body
	workspacebody.classList.add("workspaceviewtournamentinformation");

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

	fillclubstable(tid);
	
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
	let requestdata = {tid: tid, cid: cid};

	let phpresponse = await fetch("/lib/administration/php/deleteclub.php", {
		method: 'POST',
		headers: {
			'Accept': 'application/jsono',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(requestdata)
	});

	let response = await phpresponse.json();

	if(response.result == 0){
		fillclubstable(tid);
		alert("Verein gelöscht");
	}else{
		alert("Error");
	}
}

let updateclub = async (tid, cid, cname) => {

	let requestdata = {tid: tid, cid: cid, cname: cname};

	let phpresponse = await fetch("/lib/administration/php/updateclub.php", {
		method: 'POST',
		headers: {
			'Accept': 'application/jsono',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(requestdata)
	});

	let response = await phpresponse.json();

	if(response.result == 0){
		fillclubstable(tid);
		alert("Verein geändert");
	}else{
		alert("Error");
	}
}

let getclub = async (tid, cid) => {
	let requestdata = {tid: tid, cid: cid};

	let phpresponse = await fetch("/lib/administration/php/getclub.php", {
		method: 'POST',
		headers: {
			'Accept': 'application/jsono',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(requestdata)
	});

	let response = await phpresponse.json();

	return response;
}

let getclubs = async (tid) => {
	let requestdata = {tid: tid};

	let phpresponse = await fetch("/lib/administration/php/getclubs.php", {
		method: 'POST',
		headers: {
			'Accept': 'application/jsono',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(requestdata)
	});

	let response = await phpresponse.json();

	return response;
}

let getmatchdays = async (tid) => {
	let requestdata = {tid: tid};

	let phpresponse = await fetch("/lib/administration/php/getmatchdays.php", {
		method: 'POST',
		headers: {
			'Accept': 'application/jsono',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(requestdata)
	});

	let response = await phpresponse.json();

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

	
	toggleoverlay(true);
}

let buildmodalcreateclub = (tid) => {
		
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

DOMready(buildheader);
DOMready(buildnavigation);
DOMready(buildworkspace);

DOMready(addEventListeners);