function addEventListeners(){
    
    document.getElementById("createuserdiv").addEventListener("click", function(){
        buildCreateUser();
    })

	document.getElementById("deleteuserdiv").addEventListener("click", function(){
        buildDeleteUser();
    })
}

function buildCreateUser(){
	
	//clear main content div
	clearNode("maincontent");
	
	//get main content div from document
	let maincontentdiv = document.getElementById("maincontent");

	console.log("Create New User Button clicked");

	console.log(maincontentdiv);

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
	createuserconent.appendChild(createuserbutton);

	//append main content div to docfrag
	docfrag.append(createuserconent);

	maincontentdiv.append(docfrag);

}

function buildDeleteUser(){
	//clear main content div
	clearNode("maincontent");

	//get main content div from document
	let maincontentdiv = document.getElementById("maincontent");



	
}

async function createNewUser(){
	console.log("hi");



	let username = document.getElementById("usernameinput").value;
	let userpassword = document.getElementById("userpwinput").value;;


	let userinfo = {username: username, userpassword: userpassword};

	console.log(userinfo);
	
	let result = await ajaxCallPromise({
		url: "/mcs/lib/admin/createnewuser.php",
		method: "POST",
		data: userinfo
	})

}


//test
DOMready(buildCreateUser);
//test

DOMready(addEventListeners);