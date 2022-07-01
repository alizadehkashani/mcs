function addEventListeners(){
	document.getElementById("startgroupsdiv").addEventListener("click", function(){
		buildStartgroups();
	})

	document.getElementById("importgroupdiv").addEventListener("click", function(){
		buildImportData();
	})
    
    document.getElementById("createuserdiv").addEventListener("click", function(){
        buildCreateUser();
    })

	document.getElementById("deleteuserdiv").addEventListener("click", function(){
        buildDeleteUser();
    })
}

//TODO
//aktuelle gruppe und naechste gruppe
//funktinalitatet neue spalte routiren
//startnummern
//verein(?)

function buildStartgroups(){
	
	//clear main content div
	clearNode("maincontent");

	//get main content div from document
	let maincontentdiv = document.getElementById("maincontent");

	//create empty document fragment
	let docfrag = new DocumentFragment();

	//create new create user content div
	let startgroupscontentdiv = document.createElement("div");
	startgroupscontentdiv.classList.add("startgroupscontentdiv");

	//build track header
	buildtrackheader(startgroupscontentdiv, "headertrackA", "Anlage A", "Filz");
	buildtrackheader(startgroupscontentdiv, "headertrackB", "Anlage B", "Miniaturgolf");

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
	
	let trackplayerscontainer = document.createElement("div");
	trackplayerscontainer.setAttribute("id", playercontainerdivid);
	trackplayerscontainer.classList.add("trackplayercontainer")
	contentdiv.appendChild(trackplayerscontainer);

	let currentplayers = await(ajaxCallPromise({
		url: "lib/administration/getcurrentplayer.php",
		method: "POST",
		data: {track: trackid}
	}));
	
	for(let i = 0; i < currentplayers.length; i++){
		let playernumber = document.createElement("div");
		playernumber.innerText = currentplayers[i]['player'];

		trackplayerscontainer.appendChild(playernumber);

		let playersurname = document.createElement("div");
		playersurname.innerText = currentplayers[i]['surname'];
		trackplayerscontainer.appendChild(playersurname);

		let playerfirstname = document.createElement("div");
		playerfirstname.innerText = currentplayers[i]['firstname'];
		trackplayerscontainer.appendChild(playerfirstname);
		
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
		
		trackcurrentgroupcontainer.innerText = currentgroup['currentgroup'];
		
		
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

function buildtrackheader(contentdiv, headerid, tracklabeltext, trackdescription){
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
	trackdescr.innerText = trackdescription;
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

	playercontainerid = "track" + track + "playercontainer";

	let playercontainer = document.getElementById(playercontainerid);

	clearNode(playercontainerid);

	let currentplayers = await(ajaxCallPromise({
		url: "lib/administration/getcurrentplayer.php",
		method: "POST",
		data: {track: track}
	}));
	
	for(let i = 0; i < currentplayers.length; i++){
		let playernumber = document.createElement("div");
		playernumber.innerText = currentplayers[i]['player'];

		playercontainer.appendChild(playernumber);

		let playersurname = document.createElement("div");
		playersurname.innerText = currentplayers[i]['surname'];
		playercontainer.appendChild(playersurname);

		let playerfirstname = document.createElement("div");
		playerfirstname.innerText = currentplayers[i]['firstname'];
		playercontainer.appendChild(playerfirstname);
		
	}

	
}

async function refreshcurrentgroup(track){
	let groupdisplaydivid = "track" + track + "currentgroup";

	let groupdisplaydiv = document.getElementById(groupdisplaydivid);

	let currentgroup = await(ajaxCallPromise({
		url: "lib/administration/getcurrentgroup.php",
		method: "POST",
		data: {trackid: track}
	}));

	groupdisplaydiv.innerText = currentgroup['currentgroup'];
}

function buildImportData(){
	
	//clear main content div
	clearNode("maincontent");

	//get main content div from document
	let maincontentdiv = document.getElementById("maincontent");

	//create empty document fragment
	let docfrag = new DocumentFragment();

	//create new content div for cvs imports
	let importgroupcontent = document.createElement("div");
	importgroupcontent.classList.add("importdatacontent")

	//**GROUPS */
	//crate description for group import
	let groupsdescription = document.createElement("div");
	groupsdescription.innerText = "Import Startgroups";
	importgroupcontent.appendChild(groupsdescription);

	//create group import button
	let importgroupscvsbutton = document.createElement("div");
	importgroupscvsbutton.setAttribute("id", "importgroupscvsbutton");
	importgroupscvsbutton.classList.add("importcsvbutton");
	importgroupscvsbutton.innerText = "Import CSV";
	importgroupscvsbutton.addEventListener("click", importgroupCSV);
	importgroupcontent.appendChild(importgroupscvsbutton);

	//create div for group php reply
	let phpreplydivgroups = document.createElement("div");
	phpreplydivgroups.setAttribute("id", "importgroupscsvreply");
	importgroupcontent.appendChild(phpreplydivgroups);

	//**PLAYER */
	//crate description for player import
	let playerdescription = document.createElement("div");
	playerdescription.innerText = "Import new Players";
	importgroupcontent.appendChild(playerdescription);

	//create player import button
	let importplayerscsvbutton = document.createElement("div");
	importplayerscsvbutton.setAttribute("id", "importplayerscsvbutton");
	importplayerscsvbutton.classList.add("importcsvbutton");
	importplayerscsvbutton.innerText = "Import CSV";
	importplayerscsvbutton.addEventListener("click", importplayerCSV);
	importgroupcontent.appendChild(importplayerscsvbutton);

	//create div for group php reply
	let phpreplydivplayers = document.createElement("div");
	phpreplydivplayers.setAttribute("id", "importplayercsvreply");
	importgroupcontent.appendChild(phpreplydivplayers);

	//append main content div to docfrag
	docfrag.append(importgroupcontent);

	maincontentdiv.appendChild(docfrag);
}

async function importplayerCSV(){
	let replydiv = document.getElementById("importplayercsvreply")

	replydiv.innerText = "";
	
	let result = await ajaxCallPromise({
		url: "/mcs/lib/administration/importplayercsv.php",
		method: "POST"
	});

	switch(result['status']){
		case 0:
			replydiv.innerText = result['entries'] + " Entries imported";
			break;
		case 1:
			replydiv.innerText = result['errormessage'];
			break;
	}

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

//test
DOMready(buildImportData);



DOMready(addEventListeners);