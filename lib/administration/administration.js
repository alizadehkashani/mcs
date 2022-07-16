function addEventListeners(){
	//startgroups
	document.getElementById("startgroupsdiv").addEventListener("click", function(){
		buildStartgroups();
	})

	//generate startgroups
	document.getElementById("importgroupdiv").addEventListener("click", function(){
		buildgeneratestartgroups();
	})
    
	//createuser
    document.getElementById("createuserdiv").addEventListener("click", function(){
        buildCreateUser();
    })

	//deleteuser
	document.getElementById("deleteuserdiv").addEventListener("click", function(){
        buildDeleteUser();
    })

	//clubs
	document.getElementById("clubsdiv").addEventListener("click", function(){
        buildclubs();
    })

	//players
	document.getElementById("playersdiv").addEventListener("click", function(){
        buildplayers();
    })
}

let buildgeneratestartgroups = () => {
	
	//clear main content div
	clearNode("maincontent");
	clearNode("header");

	//get main content div from document
	let maincontentdiv = document.getElementById("maincontent");

	let maingenerategroupscontentdiv = creatediv({
		appendto: maincontentdiv,
		divid: "generategroupsmaincontainerdiv"
	})

	let generategroupsbuttonscontainer = creatediv({
		divid: "generategroupsbuttonscontainer",
		appendto: maingenerategroupscontentdiv
	})

	let day1button = creatediv({
		divclass: ["importcsvbutton"],
		appendto: generategroupsbuttonscontainer,
		divtext: "Tag 1"
	})

	day1button.addEventListener("click", async () =>{
		
		await(ajaxCallPromise({
			url: "/mcs/lib/administration/deletestartgroups.php",
			method: "POST"
		}))
		
		
		let reply = await(ajaxCallPromise({
			url: "/mcs/lib/administration/generatestartgroups.php",
			method: "POST"
		}))
		
		console.log(reply);

	})

}

let buildplayers = async () => {
	
	//clear main content div
	clearNode("maincontent");
	clearNode("header");

	//get main content div from document
	let maincontentdiv = document.getElementById("maincontent");

	let maincontainerimportplayers = creatediv({
		divclass: ["maincontainerimportplayers"], 
		appendto: maincontentdiv
	})

	//create group import button	
	let importplayersbutton = creatediv({
		divid: "importclubsbutton",
		divtext: "Import",
		divclass: ["importcsvbutton"],
		appendto: maincontainerimportplayers
	})
	importplayersbutton.addEventListener("click", importplayers);
	
	//div for player headline
	let playerstableheadline = creatediv({
		divid: "playerstableheadline",
		appendto: maincontainerimportplayers
	})

	const headlines = ["Spielernr", "Reihenfolge", "Nachname", "Vorname", "Verein"];

	for(i = 0; i < headlines.length; i++){
		creatediv({
			divtext: headlines[i],
			appendto: playerstableheadline
		})
	}

	//div for players table
	let playerstable = creatediv({
		divid: "playerstable",
		appendto: maincontainerimportplayers
	})
	
	let players = await(getplayers());

	for(i = 0; i < players.length; i++){
		let individualplayer = creatediv({
			divclass: ["individualplayerplayers"],
			appendto: playerstable
		})

		creatediv({divtext: players[i]["playernumber"], appendto: individualplayer});
		creatediv({divtext: players[i]["playerorderteam"], appendto: individualplayer});
		creatediv({divtext: players[i]["surname"], appendto: individualplayer});
		creatediv({divtext: players[i]["firstname"], appendto: individualplayer});
		creatediv({divtext: players[i]["name"], appendto: individualplayer});
	}
}

let getplayers = async () => {
	let players = await(ajaxCallPromise({
		url: "/mcs/lib/administration/getplayers.php",
		method: "POST" 
	}));

	return players;
}

let importplayers = async () => {
	
	/*
	let replydiv = document.getElementById("importplayercsvreply")

	replydiv.innerText = "";
	*/

	let result = await ajaxCallPromise({
		url: "/mcs/lib/administration/importplayercsv.php",
		method: "POST"
	});

	/*
	switch(result['status']){
		case 0:
			replydiv.innerText = result['entries'] + " Entries imported";
			break;
		case 1:
			replydiv.innerText = result['errormessage'];
			break;
	}
	*/
}

let buildclubs = async () => {
	
	//clear main content div
	clearNode("maincontent");
	clearNode("header");

	//get main content div from document
	let maincontentdiv = document.getElementById("maincontent");

	//main container for clubs
	let maincontainerimportclubs = document.createElement("div");
	maincontainerimportclubs.setAttribute("id", "maincontainerimportclubs");
	maincontentdiv.appendChild(maincontainerimportclubs);

	//buttonscontainer
	let buildclubsbuttonscontainer = creatediv({
		divid: "buildclubsbuttonscontainer",
		appendto: maincontainerimportclubs
	})

	let buildclubsrefreshbutton = document.createElement("img");
	buildclubsrefreshbutton.classList.add("refreshbutton");
	buildclubsrefreshbutton.setAttribute("src", "/mcs/lib/assets/refresh.svg")
	buildclubsbuttonscontainer.appendChild(buildclubsrefreshbutton);
	

	//create group import button
	let importclubsbutton = document.createElement("div");
	importclubsbutton.setAttribute("id", "importclubsbutton");
	importclubsbutton.classList.add("importcsvbutton");
	importclubsbutton.innerText = "Import";
	importclubsbutton.addEventListener("click", importclubs);
	buildclubsbuttonscontainer.appendChild(importclubsbutton);

	//create table headline
	let clubsheadlinecontainer = creatediv({
		divid: "clubtableheadline", 
		divclass: ["individualclubcontainer"],
		appendto: maincontainerimportclubs
	});

	const clubsheadline = ["Nummer", "Reihenfolge", "Kategorie","Name"];

	for(let i = 0; i < clubsheadline.length; i++){
		creatediv({
			appendto: clubsheadlinecontainer,
			divtext: clubsheadline[i]
		})
	}

	//table for clubs on db
	let mainclubscontainer = document.createElement("div");
	mainclubscontainer.setAttribute("id", "clubstable");
	maincontainerimportclubs.appendChild(mainclubscontainer);

	buildclubstable(mainclubscontainer);
	
	buildclubsrefreshbutton.addEventListener("click", () =>{
		buildclubstable(mainclubscontainer);
	})

}

let buildclubstable = async (container) => {
	//clearcontainer
	clearNodeElement(container);


	//get clubs
	let clubs = await(getclubs());
		
	for(let i = 0; i < clubs.length; i++){
		
		//container for each club
		let clubcontainer = creatediv({
			divclass: ["individualclubcontainer"],
			appendto: container
		});

		//clubnumber
		creatediv({divtext:clubs[i]["id"], appendto: clubcontainer});
		
		//club start order
		creatediv({divtext: clubs[i]["startorder"], appendto: clubcontainer});
		
		//club category
		creatediv({divtext: clubs[i]["category"], appendto: clubcontainer});

		//clubname
		creatediv({divtext: clubs[i]["name"], appendto: clubcontainer});
		
	}
}


let importclubs = async () => {
	let clubs = await(ajaxCallPromise({
		url: "/mcs/lib/administration/importclubscsv.php",
		method: "POST"
	}))
}

let getclubs = async () => {
	let clubs = await(ajaxCallPromise({
		url: "/mcs/lib/administration/getclubs.php",
		method: "POST"
	}))

	return clubs;
}

function buildStartgroups(){
	
	//clear main content div
	clearNode("maincontent");
	clearNode("header");

	buildtopbuttons();

	//get main content div from document
	let maincontentdiv = document.getElementById("maincontent");

	//create empty document fragment
	let docfrag = new DocumentFragment();

	//create new create user content div
	let startgroupscontentdiv = document.createElement("div");
	startgroupscontentdiv.classList.add("startgroupscontentdiv");

	//build track header
	buildtrackheader(startgroupscontentdiv, "headertrackA", "Anlage A", "A");
	buildtrackheader(startgroupscontentdiv, "headertrackB", "Anlage B", "B");

	//build group control
	buildgroupcontrol(startgroupscontentdiv, "trackAcontrolcontainer", "A");
	buildgroupcontrol(startgroupscontentdiv, "trackBcontrolcontainer", "B");

	//build current players
	buildtrackplayers(startgroupscontentdiv, "trackAplayercontainer", "A");
	buildtrackplayers(startgroupscontentdiv, "trackBplayercontainer", "B");

	//append main content div to docfrag
	docfrag.append(startgroupscontentdiv);

	maincontentdiv.appendChild(docfrag);
}

async function buildtrackplayers(contentdiv, playercontainerdivid, trackid){
	
	//create container for players, set id, set class, append
	let trackplayerscontainer = document.createElement("div");
	trackplayerscontainer.setAttribute("id", playercontainerdivid);
	trackplayerscontainer.classList.add("trackplayercontainer")
	contentdiv.appendChild(trackplayerscontainer);
	
	//container for next startgroup
	let nextgroupcontainer = document.createElement("div");
	nextgroupcontainer.classList.add("groupcontainer");
	trackplayerscontainer.appendChild(nextgroupcontainer);
	
	//add next group headline container
	let nextheadlinecontainer = document.createElement("div");
	nextheadlinecontainer.classList.add("groupdescriptioncontainer");
	nextheadlinecontainer.classList.add("nextgroup");
	nextgroupcontainer.appendChild(nextheadlinecontainer);
	
	//add next group description
	let nextheadline = document.createElement("div");
	nextheadline.classList.add("groupheadline");
	nextheadline.innerText = "Nächste Gruppe";
	nextheadlinecontainer.appendChild(nextheadline);

	//create div for next group number
	let headlinenextgroupnumber = document.createElement("div");
	headlinenextgroupnumber.setAttribute("id", "track" + trackid + "nextgroupnumber")
	headlinenextgroupnumber.classList.add("groupheadline");
	nextheadlinecontainer.appendChild(headlinenextgroupnumber);

	//container for next individual players
	let nextplayerscontainer = document.createElement("div");
	nextplayerscontainer.setAttribute("id", "track"+ trackid + "nextplayers");
	nextplayerscontainer.classList.add("playerscontainer");
	nextgroupcontainer.appendChild(nextplayerscontainer);
	
	//container for current group
	let currentgroupcontainer = document.createElement("div");
	currentgroupcontainer.classList.add("groupcontainer");
	trackplayerscontainer.appendChild(currentgroupcontainer);
	
	//add headline container for current group
	let currentheadlinecontainer = document.createElement("div");
	currentheadlinecontainer.classList.add("groupdescriptioncontainer");
	currentheadlinecontainer.classList.add("currentgroup");
	currentgroupcontainer.appendChild(currentheadlinecontainer);
	
	//add current group description
	let currentheadline = document.createElement("div");
	currentheadline.innerText = "Aktuelle Gruppe";
	currentheadline.classList.add("groupheadline");
	currentheadlinecontainer.appendChild(currentheadline);
	
	//create div for current group number
	let headlinecurrentgroupnumber = document.createElement("div");
	headlinecurrentgroupnumber.setAttribute("id", "track" + trackid + "currentgroupnumber")
	headlinecurrentgroupnumber.classList.add("groupheadline");
	currentheadline.classList.add("groupheadline");
	currentheadlinecontainer.appendChild(headlinecurrentgroupnumber);
	
	//container for current individual players
	let currentplayerscontainer = document.createElement("div");
	currentplayerscontainer.setAttribute("id", "track" + trackid + "currentplayers");
	currentplayerscontainer.classList.add("playerscontainer");
	currentgroupcontainer.appendChild(currentplayerscontainer);
	
	//get next players
	let nextplayers = await(ajaxCallPromise({
		url: "lib/administration/getplayeroffset.php",
		method: "POST",
		data: {track: trackid, offset: 1}
	}));
	
	//get current players
	let currentplayers = await(ajaxCallPromise({
		url: "lib/administration/getplayeroffset.php",
		method: "POST",
		data: {track: trackid, offset: 0}
	}));
	
	if(nextplayers.length != 0){
		buildplayergroup(nextplayers, nextplayerscontainer, headlinenextgroupnumber);
	}

	buildplayergroup(currentplayers, currentplayerscontainer, headlinecurrentgroupnumber);
	
}

//fills the groups containers with the according players from databas
function buildplayergroup(players, container, groupnumbercontainer){

	//set the group number in the group headlines
	if(players.length == 0){
		groupnumbercontainer.innerText = "";
	}else{
		groupnumbercontainer.innerText = players[0]['startgroup'];
	}

	//loop through the players and create elements
	for(let i = 0; i < players.length; i++){
		
		//contaier for single player
		let individualplayercontainer = document.createElement("div");
		individualplayercontainer.classList.add("individualplayercontainer");
		container.appendChild(individualplayercontainer);
		
		//player number
		let playernumber = document.createElement("div");
		playernumber.classList.add("playernumber");
		playernumber.innerText = players[i]['playernumber'];
		individualplayercontainer.appendChild(playernumber);
		
		//container for sur and first name and club
		let playerinfocontainer = document.createElement("div");
		playerinfocontainer.classList.add("playerinfocontainer");
		individualplayercontainer.appendChild(playerinfocontainer);
		
		//container for name
		let playernamecontainer = document.createElement("div");
		playernamecontainer.classList.add("playernamecontainer");
		playerinfocontainer.appendChild(playernamecontainer);
		
		//surname
		let playersurname = document.createElement("div");
		playersurname.innerText = players[i]['surname'];
		playernamecontainer.appendChild(playersurname);

		//firstname
		let playerfirstname = document.createElement("div");
		playerfirstname.innerText = players[i]['firstname'];
		playernamecontainer.appendChild(playerfirstname);
		
		//club
		let playerclub = document.createElement("div");
		playerclub.classList.add("club");
		playerclub.innerText = players[i]['name'];
		playerinfocontainer.appendChild(playerclub);
	}
}

async function buildgroupcontrol(contendiv, containerid, trackid){

		//create track a group control container
		let trackcontrolcontainer = document.createElement("div");
		trackcontrolcontainer.classList.add("trackcontrolcontainer");
		trackcontrolcontainer.setAttribute("id", containerid)
		contendiv.appendChild(trackcontrolcontainer);
	
		//add track a minus sign
		//div for img
		let trackminuscontainer = document.createElement("div");
		trackminuscontainer.classList.add("groupcontrollbuttoncontainer");
	
		//minus img
		let trackminus = document.createElement("img");
		trackminus.src = "/mcs/lib/assets/minus.svg";
		trackminus.classList.add("groupcontrollbutton");
		trackminus.addEventListener("click", function(){
			changecurrentgroup(trackid, "minus");
		})
		trackminuscontainer.appendChild(trackminus);

		//append div containing img
		trackcontrolcontainer.appendChild(trackminuscontainer);
	
		//add track display current group
		let trackcurrentgroupcontainer = document.createElement("div");
		trackcurrentgroupcontainer.classList.add("displaycurrentgroup");
		trackcurrentgroupcontainer.setAttribute("id", "track" + trackid + "currentgroup");
		//id = trackAcurrentgroup/trackBcurrentgroup

		//---get current group of track--

		let currentgroup = await(ajaxCallPromise({
			url: "lib/administration/getcurrentgroup.php",
			method: "POST",
			data: {trackid: trackid}
		}));

		
		//---set current group of track--
		
		trackcurrentgroupcontainer.innerText = currentgroup['startgroup'];
		
		
		trackcontrolcontainer.appendChild(trackcurrentgroupcontainer);
	
		//add track a plus sign
		let trackpluscontainer = document.createElement("div");
		trackpluscontainer.classList.add("groupcontrollbuttoncontainer");
	
		let trackaplus = document.createElement("img");
		trackaplus.src = "/mcs/lib/assets/plus.svg";
		trackaplus.classList.add("groupcontrollbutton");
		trackaplus.addEventListener("click", function(){
			changecurrentgroup(trackid, "plus");
		})
		trackpluscontainer.appendChild(trackaplus);
	
		trackcontrolcontainer.appendChild(trackpluscontainer);

}

async function buildtrackheader(contentdiv, headerid, tracklabeltext, trackid){

	let trackdescriptiondb = await(gettrackdescription(trackid));
	trackdescriptiondb = trackdescriptiondb["trackdescription"];
	
	
	//create track a header
	let trackheaderdiv = document.createElement("div");
	trackheaderdiv.classList.add("trackHeader");
	trackheaderdiv.setAttribute("id", headerid);
	contentdiv.appendChild(trackheaderdiv);

	//create track a label
	let tracklabel = document.createElement("div");
	tracklabel.classList.add("tracklabel");
	tracklabel.innerText = tracklabeltext;
	trackheaderdiv.appendChild(tracklabel);

	//create tack a description
	let trackdescr = document.createElement("div");
	trackdescr.classList.add("trackdescription");
	trackdescr.innerText = trackdescriptiondb;
	trackheaderdiv.appendChild(trackdescr); 
}

async function changecurrentgroup(track, sign){
	
	let reply = await(ajaxCallPromise({
		url: "lib/administration/changecurrentgroup.php",
		method: "POST",
		data: {track: track, sign: sign}
	}))

	if(reply['status'] == 0){
		refreshcurrentgroup(track);
		refreshcurrentplayers(track)
	}

}

async function refreshcurrentplayers(track){

	let nextplayercontainerid = "track" + track + "nextplayers";
	let currentplayercontainerid = "track" + track + "currentplayers";
	
	let nextplayercontainer = document.getElementById(nextplayercontainerid);
	let currentplayercontainer = document.getElementById(currentplayercontainerid);
	
	let nextgroupnumbercontainerid = "track" + track + "nextgroupnumber";
	let currentgroupnumbercontainerid = "track" + track + "currentgroupnumber";

	let nextgroupnumbercontainer = document.getElementById(nextgroupnumbercontainerid);
	let currentgroupnumbercontainer = document.getElementById(currentgroupnumbercontainerid);

	clearNode(nextplayercontainerid);
	clearNode(currentplayercontainerid);

	clearNode(nextgroupnumbercontainerid);
	clearNode(currentgroupnumbercontainerid);

	//get next players
	let nextplayers = await(ajaxCallPromise({
		url: "lib/administration/getplayeroffset.php",
		method: "POST",
		data: {track: track, offset: 1}
	}));
	
	//get current players
	let currentplayers = await(ajaxCallPromise({
		url: "lib/administration/getplayeroffset.php",
		method: "POST",
		data: {track: track, offset: 0}
	}));

	

	if(nextplayers.length != 0){
		buildplayergroup(nextplayers, nextplayercontainer, nextgroupnumbercontainer);
	}

	buildplayergroup(currentplayers, currentplayercontainer, currentgroupnumbercontainer);

	
}

async function refreshcurrentgroup(track){
	let groupdisplaydivid = "track" + track + "currentgroup";

	let groupdisplaydiv = document.getElementById(groupdisplaydivid);

	let currentgroup = await(ajaxCallPromise({
		url: "lib/administration/getcurrentgroup.php",
		method: "POST",
		data: {trackid: track}
	}));

	groupdisplaydiv.innerText = currentgroup['startgroup'];
}


async function importplayerCSV(){
	console.log("hi");

}

async function importgroupCSV(){

	let replydiv = document.getElementById("importgroupscsvreply")

	replydiv.innerText = "";
	
	let result = await ajaxCallPromise({
		url: "/mcs/lib/administration/importgroupcsv.php",
		method: "POST"
	})

	switch(result['status']){
		case 0:
			replydiv.innerText = result['entries'] + " Entries imported";
			break;
		case 1:
			replydiv.innerText = result['errormessage'];
			break;
	}
}

function buildCreateUser(){
	
	//clear main content div
	clearNode("maincontent");
	clearNode("header");
	
	//get main content div from document
	let maincontentdiv = document.getElementById("maincontent");

	
	//create empty document fragment
	let docfrag = new DocumentFragment();

	//create new create user content div
	let createuserconent = document.createElement("div");
	//add class list to div
	createuserconent.classList.add("createusercontent");
	
	//create userlabel, set class, set inner text, append div
	let usernamelabel = document.createElement("div");
	usernamelabel.classList.add("createuserlabel");
	usernamelabel.innerText = "Username";
	createuserconent.appendChild(usernamelabel);

	//create username input, set id, append
	let usernameinput = document.createElement("input");
	usernameinput.setAttribute("id", "usernameinput");
	createuserconent.appendChild(usernameinput);

	//create password label, add class, set text, append
	let passwordlabel = document.createElement("div");
	passwordlabel.classList.add("createuserlabel");
	passwordlabel.innerText = "Password";
	createuserconent.appendChild(passwordlabel);

	//create password input field, set id, append
	let passwordinput = document.createElement("input");
	passwordinput.setAttribute("type", "password");
	passwordinput.setAttribute("id", "userpwinput");
	createuserconent.appendChild(passwordinput);

	//create user create button, set id, text, append
	let createuserbutton = document.createElement("div");
	createuserbutton.setAttribute("id", "createuserbutton");
	createuserbutton.innerText = "Create New User";
	createuserbutton.addEventListener("click", createNewUser);
	
	createuserconent.addEventListener("keyup", function(key){
		if(key.key === "Enter"){
			createNewUser();
		}
	});
	
	createuserconent.appendChild(createuserbutton);

	//div to display result
	let createuserresult = document.createElement("div");
	createuserresult.setAttribute("id", "createuserresult");
	createuserconent.appendChild(createuserresult);

	//append main content div to docfrag
	docfrag.append(createuserconent);

	maincontentdiv.append(docfrag);

}

function buildDeleteUser(){
	//clear main content div
	clearNode("maincontent");
	clearNode("header");
	
	//create empty document fragment
	let docfrag = new DocumentFragment();

	//create new delete user content div
	let deleteusercontent = document.createElement("div");
	//add class list to div
	deleteusercontent.classList.add("deleteusercontent");

	//get main content div from document
	let maincontentdiv = document.getElementById("maincontent");

	//create userlabel, set class, set inner text, append div
	let usernamelabel = document.createElement("div");
	usernamelabel.classList.add("deleteuserlabel");
	usernamelabel.innerText = "Username";
	deleteusercontent.appendChild(usernamelabel);

	//create username input, set id, append
	let usernameinput = document.createElement("input");
	usernameinput.setAttribute("id", "usernameinput");
	deleteusercontent.appendChild(usernameinput);

	//create user create button, set id, text, append
	let delteuserbutton = document.createElement("div");
	delteuserbutton.setAttribute("id", "delteuserbutton");
	delteuserbutton.innerText = "Delete User";
	delteuserbutton.addEventListener("click", deleteUser);
	
	deleteusercontent.addEventListener("keyup", function(key){
		if(key.key === "Enter"){
			deleteUser();
		}
	});

	deleteusercontent.appendChild(delteuserbutton);

	//div to display result
	let createuserresult = document.createElement("div");
	createuserresult.setAttribute("id", "deleteuserresult");
	deleteusercontent.appendChild(createuserresult);


	docfrag.append(deleteusercontent);

	maincontentdiv.append(docfrag);

	
}



async function createNewUser(){
	
	let resultdiv = document.getElementById("createuserresult");

	resultdiv.innerText = "";

	let username = document.getElementById("usernameinput").value;
	let userpassword = document.getElementById("userpwinput").value;

	if(username == "" || userpassword == ""){
		resultdiv.innerText = "Please fill Username and Password";
	}else{

		let userinfo = {username: username, userpassword: userpassword};
		
		let result = await ajaxCallPromise({
			url: "/mcs/lib/administration/createnewuser.php",
			method: "POST",
			data: userinfo
		});

		if(result['result'] == 0){
			document.getElementById("usernameinput").value = "";
			document.getElementById("userpwinput").value = "";
		}
	
		resultdiv.innerText = result['message'];
	}

}

async function deleteUser(){
	
	let resultdiv = document.getElementById("deleteuserresult");

	resultdiv.innerText = "";

	let username = document.getElementById("usernameinput").value;

	if(username == ""){
		resultdiv.innerText = "Please set Username";
	}else{

		let userinfo = {username: username};
		
		let result = await ajaxCallPromise({
			url: "/mcs/lib/administration/deleteuser.php",
			method: "POST",
			data: userinfo
		})

		if(result['result'] == 0){
			document.getElementById("usernameinput").value = "";
		}
	
		resultdiv.innerText = result['message'];
	}
}

let buildtopbuttons = () => {
	let header = document.getElementById("header");
	
	let swap = creatediv({
		appendto: header,
		divclass: ["topbuttoncontainer"]
	})
	
	let swapbutton = document.createElement("img");
	swapbutton.setAttribute("src", "/mcs/lib/assets/swap.svg");
	swapbutton.title = "Bahnen tauschen";
	swap.appendChild(swapbutton);

	swapbutton.addEventListener("click", async () => {
				
		await ajaxCallPromise({
			url: "/mcs/lib/administration/swaptrackdesc.php",
			method: "POST"
		})

		buildStartgroups();
				
	})

}

//defaultview
DOMready(buildgeneratestartgroups);

DOMready(addEventListeners);