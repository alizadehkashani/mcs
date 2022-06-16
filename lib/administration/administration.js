function addEventListeners(){
	document.getElementById("startgroupsdiv").addEventListener("click", function(){
		buildStartgroups();
	})

	document.getElementById("importgroupdiv").addEventListener("click", function(){
		buildImportGroup();
	})
    
    document.getElementById("createuserdiv").addEventListener("click", function(){
        buildCreateUser();
    })

	document.getElementById("deleteuserdiv").addEventListener("click", function(){
        buildDeleteUser();
    })
}

function buildStartgroups(){
	console.log('startgroups');
	//clear main content div
	clearNode("maincontent");

	//get main content div from document
	let maincontentdiv = document.getElementById("maincontent");

	//create empty document fragment
	let docfrag = new DocumentFragment();

	//create new create user content div
	let startgroupscontentdiv = document.createElement("div");
	startgroupscontentdiv.classList.add("startgroupscontentdiv");


	//create track a header
	let trackaheaderdiv = document.createElement("div");
	trackaheaderdiv.classList.add("trackHeader");
	trackaheaderdiv.setAttribute("id", "headertrackA");
	startgroupscontentdiv.appendChild(trackaheaderdiv);

	//create track a label
	let trackalabel = document.createElement("div");
	trackalabel.classList.add("tracklabel");
	trackalabel.innerText = "Anlage A";
	trackaheaderdiv.appendChild(trackalabel);

	//create tack a description
	let trackadescr = document.createElement("div");
	trackadescr.classList.add("trackdescription");
	trackadescr.innerText = "Filz";
	trackaheaderdiv.appendChild(trackadescr); 

	//create track b header
	let trackbheaderdiv = document.createElement("div");
	trackbheaderdiv.classList.add("trackHeader");
	trackbheaderdiv.setAttribute("id", "headertrackB");
	startgroupscontentdiv.appendChild(trackbheaderdiv);

	//create track b label
	let trackblabel = document.createElement("div");
	trackblabel.classList.add("tracklabel");
	trackblabel.innerText = "Anlage B";
	trackbheaderdiv.appendChild(trackblabel);
	
	//create tack b description
	let trackbdescr = document.createElement("div");
	trackbdescr.classList.add("trackdescription");
	trackbdescr.innerText = "Miniaturgolf";
	trackbheaderdiv.appendChild(trackbdescr);

	//create track a group control container
	let trackacontrolcontainer = document.createElement("div");
	trackacontrolcontainer.classList.add("trackcontrolcontainer");
	trackacontrolcontainer.setAttribute("id", "trackacontrolcontainer")
	startgroupscontentdiv.appendChild(trackacontrolcontainer);

	//add track a minus sign
	let trackaminuscontainer = document.createElement("div");
	trackaminuscontainer.classList.add("groupcontrollbuttoncontainer");

	let trackaminus = document.createElement("img");
	trackaminus.src = "/mcs/lib/assets/minus.svg";
	trackaminus.classList.add("groupcontrollbutton");
	trackaminuscontainer.appendChild(trackaminus);

	trackacontrolcontainer.appendChild(trackaminuscontainer);

	//add track a display current group
	let trackacurrentgroupcontainer = document.createElement("div");
	trackacurrentgroupcontainer.classList.add("displaycurrentgroup");
	trackacurrentgroupcontainer.innerText = "1";
	trackacontrolcontainer.appendChild(trackacurrentgroupcontainer);

	//add track a plus sign
	let trackapluscontainer = document.createElement("div");
	trackapluscontainer.classList.add("groupcontrollbuttoncontainer");

	let trackaplus = document.createElement("img");
	trackaplus.src = "/mcs/lib/assets/plus.svg";
	trackaplus.classList.add("groupcontrollbutton");
	trackapluscontainer.appendChild(trackaplus);

	trackacontrolcontainer.appendChild(trackapluscontainer);


	//append main content div to docfrag
	docfrag.append(startgroupscontentdiv);

	maincontentdiv.appendChild(docfrag);



}

function buildImportGroup(){
	
	//clear main content div
	clearNode("maincontent");

	//get main content div from document
	let maincontentdiv = document.getElementById("maincontent");

	//create empty document fragment
	let docfrag = new DocumentFragment();

	//create new create user content div
	let importgroupcontent = document.createElement("div");
	importgroupcontent.classList.add("importgroupcontent")

	//crate description
	let descriptiondiv = document.createElement("div");
	descriptiondiv.innerText = "Import new Startgroups";
	importgroupcontent.appendChild(descriptiondiv);

	//create import button
	let importcsvbutton = document.createElement("div");
	importcsvbutton.setAttribute("id", "importcsvbutton");
	importcsvbutton.innerText = "Import CSV";
	importcsvbutton.addEventListener("click", importCSV);
	importgroupcontent.appendChild(importcsvbutton);

	//create div for php reply
	let phpreplydiv = document.createElement("div");
	phpreplydiv.setAttribute("id", "importcsvreply");
	importgroupcontent.appendChild(phpreplydiv);

	//append main content div to docfrag
	docfrag.append(importgroupcontent);

	maincontentdiv.appendChild(docfrag);
}

async function importCSV(){

	let replydiv = document.getElementById("importcsvreply")

	replydiv.innerText = "";
	
	let result = await ajaxCallPromise({
		url: "/mcs/lib/administration/importcsv.php",
		method: "POST"
	})

	replydiv.innerText = result['entries'] + " Entries imported";

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

		console.log(result);

		if(result['result'] == 0){
			document.getElementById("usernameinput").value = "";
		}
	
		resultdiv.innerText = result['message'];
	}
}

//test
DOMready(buildStartgroups);
//test

DOMready(addEventListeners);