let getgroupsmaincontainer = () => {
	let container = document.getElementById("displaygroupsmaincontainer");
	return container;
}

let getfoot = () => {
	let container = document.getElementById("displayfootmaincontainer");
	return container;
}

let createfoot = () => {
	let footcontainer = getfoot();
	let footmcs = creatediv({
		appendto: footcontainer,
		divclass: ["foot", "flexcenter"],
		divtext: "MCS"
	});
}

let getcurrentdata = async () => {

	//call php script
	let phppath = "/lib/getcurrentdata.php";
	let currenttournamentdata = await fetch(phppath, {
		method: 'POST',
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify()
	});

	//php response
	let phpresponse = await currenttournamentdata.json();
	
	return phpresponse;
}

let buildgroups = async () => {
	let groupscontainer = getgroupsmaincontainer();
	let groupsdata = await getcurrentdata();	
	
	for(i = 0; i < groupsdata.tracks.length; i++){
		//create main container for track header and groups
		let trackmaincontainer = createtrackmaincontainer(groupscontainer);

		//set track name from object
		let trackname = groupsdata["tracks"][i].trackdescription;
		//add track descirption
		let trackdescription = createtrackdescription(trackmaincontainer, trackname );
		//create container for current and next groups
		let startgroupscontainer = createstartgroupscontainer(trackmaincontainer);

		let cgrpdes = "Aktuelle Gruppe";
		let cgrpclass = "current-group-background";
		createsinglegroup(startgroupscontainer, groupsdata["current"][i], cgrpdes, cgrpclass);

		let ngrpdes = "N&aumlchste Gruppe";
		let ngrpclass = "next-group-background";
		createsinglegroup(startgroupscontainer, groupsdata["next"][i], ngrpdes, ngrpclass);
	}
}

let createsinglegroup = (parent, groupdata, groupdescription, groupclass) => {	
	//container for holding group description and players
	let groupcontainer = creatediv({
		appendto: parent,
		divclass: ["individual-group-container", groupclass]
	});

	//add groupd description
	creategroupdescription(groupcontainer, groupdescription);

	//add players
	for(j = 0; j < groupdata.length; j++){
		createplayer(groupcontainer, groupdata[j]);	
	}
}

let createplayer = (parent, playerdata) => {
	let playercontainer = creatediv({
		appendto: parent,
		divclass: ["player-container"]
	});

	let number = creatediv({
		appendto: playercontainer,
		divclass: ["player-text", "flexcenter"],
		divtext: playerdata.playernumber
	});

	let surname = creatediv({
		appendto: playercontainer,
		divclass: ["player-text", "flexcenter"],
		divtext: playerdata.surname
	});

	let firstname = creatediv({
		appendto: playercontainer,
		divclass: ["player-text", "flexcenter"],
		divtext: playerdata.firstname
	});
}

let creategroupdescription = (parent, description) => {
	let descriptioncontainer = creatediv({
		appendto: parent,
		divclass: ["group-description", "flexcenter"],
	});
	descriptioncontainer.innerHTML = description;
}

let createstartgroupscontainer = (parent) => {
	let startgroupscontainer = creatediv({
		appendto: parent,
		divclass: ["start-groups-container"]
	});

	return startgroupscontainer;
}

let createtrackmaincontainer = (parent) => {

	let trackmaincontainer = creatediv({
		appendto: parent,
		divclass: ["track-main-container"],
	});

	return trackmaincontainer;
}

let createtrackdescription = (parent, description) => {

	let trackdescription = creatediv({
		appendto: parent,
		divclass: ["track-description", "flexcenter"],
		divtext: description

	});

}

DOMready(buildgroups);
DOMready(createfoot);
