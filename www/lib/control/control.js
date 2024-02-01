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


let setsessiontinfo = (tid, mid, rid) => {
	sessionStorage.setItem("tid", tid);
	sessionStorage.setItem("mid", mid);
	sessionStorage.setItem("rid", rid);

}

//get information from session
let gettidfromsession = () => sessionStorage.tid;
let getmidfromsession = () => sessionStorage.mid;
let getridfromsession = () => sessionStorage.rid;

let clearsessionstorage = () => {
	window.sessionStorage.clear();
}

let checkifrebuild = async () => {
	
	//get current tournament information
	let tinfo = await gettinfo();

	//test if tournament has changed
	if(tinfo.tid != gettidfromsession()){
		console.log("tournament has changed");
		buildgroups();
		return;
	}
	
	//test if matchday has changed
	if(tinfo.mid != getmidfromsession()){
		console.log("matchday has changed");
		buildgroups();
		return;
	}
	
	//test if round has changed
	if(tinfo.rid != getridfromsession()){
		console.log("round has changed");
		buildgroups();
		return;
	}
	
}

let buildgroups = async () => {

	//clear session storage
	clearsessionstorage();
	
	//get current tournament information
	let tinfo = await gettinfo();
	
	//set session storage with tournament info
	setsessiontinfo(tinfo["tid"], tinfo["mid"], tinfo["rid"]);
	
	//get current groups of tracks
	let trackgroups = await getcurrentgrouptrack();

	//get main container from page
	let groupscontainer = getgroupsmaincontainer();
	
	//clear container
	clearelement(groupscontainer);

	//get current data from database
	let groupsdata = await getcurrentdata();	

	for(i = 0; i < groupsdata.tracks.length; i++){

		let groupnumber = groupsdata["currentgroupnumber"][i]["COUNT(groupid)"] + 1;
		let nextgroupnumber = groupnumber + 1;

		//create main container for track header and groups
		let trackmaincontainer = createtrackmaincontainer(groupscontainer);

		//set track name from object
		let trackname = groupsdata["tracks"][i].trackdescription;
		//add track descirption
		let trackdescription = createtrackdescription(trackmaincontainer, trackname );
		//create control for control and group
		let groupcontrolcontainer = creategroupcontrolcontainer(trackmaincontainer);

		let trackid = groupsdata["tracks"][i].trackid;

		//create container for current and next groups
		let startgroupscontainer = createstartgroupscontainer(groupcontrolcontainer);

		//create back arrow
		createarrow(tinfo, trackid, groupcontrolcontainer, 0, startgroupscontainer);
		//create forward arrow
		createarrow(tinfo, trackid, groupcontrolcontainer, 1, startgroupscontainer);

		if(groupsdata["current"][i] != undefined){
			createsinglegroup(startgroupscontainer, groupsdata["current"][i], 0, groupnumber);
		}else{
			break;
		}

		if(groupsdata["next"][i].length != 0){
			createsinglegroup(startgroupscontainer, groupsdata["next"][i], 1, nextgroupnumber);
		}
	}

}

let createarrow = async (tinfo, trackid, parent, direction, groupscontainer) => {
	switch(direction){
		case 0:
			arrowclass = "control-arrow-back";
			arrowicon = "icon-arrow-back";
			break;
		case 1:
			arrowclass = "control-arrow-forward";
			arrowicon = "icon-arrow-forward";
			break;
	}
			
	let arrow = creatediv({
		appendto: parent,
		divclass: [arrowclass, arrowicon, "control-arrow"]
	});

	arrow.addEventListener("click", async () => {

		let newgroup = await changegroup(tinfo, trackid, direction);
		
		let = newcurrentgroupnumber = newgroup["currentgroupnumber"] + 1;
		let = nextgroupnumber = newcurrentgroupnumber + 1;
		
		if(newgroup["current"] != undefined){

			clearelement(groupscontainer);
			
			createsinglegroup(groupscontainer, newgroup["current"], 0, newcurrentgroupnumber)

			if(newgroup["next"].length != 0){
				createsinglegroup(groupscontainer, newgroup["next"], 1, nextgroupnumber);
			}
		}

	});

}

let changegroup = async (tinfo, trackid, direction) => {
	groupdata = {
		tid: tinfo.tid,
		mid: tinfo.mid,
		rid: tinfo.rid,
		trackid: trackid,
		direction: direction
	}
	//call php script
	let phppath = "/lib/changegroup.php";
	let newgroup = await fetch(phppath, {
		method: 'POST',
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(groupdata)
	});

	//php response
	newgroup = await newgroup.json();
	
	return newgroup;

}

let createsinglegroup = (parent, groupdata, order, groupnumber) => {	

	console.log(groupnumber);

	let groupclass;
	switch(order){
		case 0:
			groupclass = ["current-group-background"];
			break;
		case 1: 
			groupclass = ["next-group-background"];
			break;
	}
	//container for holding group description and players
	let groupcontainer = creatediv({
		appendto: parent,
		divclass: ["individual-group-container", groupclass]
	});

	//add groupd description
	creategroupdescription(groupcontainer, order, groupnumber);

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

let creategroupdescription = (parent, order, groupnumber) => {
	let groupheadcontainer = creatediv({
		appendto: parent,
		divclass: ["group-head"]
	});

	let descriptioncontainer = creatediv({
		appendto: groupheadcontainer,
		divclass: ["group-description", "flexcenter"],
	});

	let spanclass;
	switch(order) {
		case 0:
			spanclass =["current-group-text"];
			break;
		case 1:
			spanclass = ["next-group-text"];
			break;
	}

	let grouptext = creatediv({
		type: "span",
		appendto: descriptioncontainer,
		divclass: spanclass
	});

	let groupnumbercontainer = creatediv({
		appendto: groupheadcontainer,
		divclass: ["flexcenter", "group-description"],
		divtext: groupnumber
	});

}

let creategroupcontrolcontainer = (parent) => {
	let groupcontrolcontainer = creatediv({
		appendto: parent,
		divclass: ["groups-control-container"]
	});

	return groupcontrolcontainer;
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

};

let gettinfo = async () => {

	//call php script
	let phppath = "/lib/getcurrenttournamentinfo.php";
	let tinfo = await fetch(phppath, {
		method: 'POST',
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify()
	});

	//php response
	let response = await tinfo.json();
	
	return response;

}

let getcurrentgrouptrack = async () => {

	//call php script
	let phppath = "/lib/getcurrentgrouptrack.php";
	let trackgroup = await fetch(phppath, {
		method: 'POST',
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify()
	});

	//php response
	let response = await trackgroup.json();
	
	return response;

}

let rebuild = async () => {
	let rebuild = window.setInterval(async function(){
		await checkifrebuild();
	}, 10000);
}

DOMready(buildgroups);
DOMready(rebuild);
DOMready(createfoot);
