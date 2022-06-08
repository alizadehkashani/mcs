function addEventListeners(){
    
    //clearvotelog button
    document.getElementById("createuserdiv").addEventListener("click", function(){
        buildCreateUser();
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
	
	let usernamelabel = document.createElement("div");
	usernamelabel.classList.add("createuserlabel");
	usernamelabel.innerText = "Username";
	createuserconent.appendChild(usernamelabel);

	let usernameinput = document.createElement("input");
	usernameinput.setAttribute("id", "usernameinput");
	createuserconent.appendChild(usernameinput);

	let passwordlabel = document.createElement("div");
	passwordlabel.classList.add("createuserlabel");
	passwordlabel.innerText = "Password";
	createuserconent.appendChild(passwordlabel);

	let passwordinput = document.createElement("input");
	passwordinput.setAttribute("type", "password");
	passwordinput.setAttribute("id", "userpwinput");
	createuserconent.appendChild(passwordinput);

	let createuserbutton = document.createElement("div");
	createuserbutton.setAttribute("id", "createuserbutton");
	createuserbutton.innerText = "Create New User";
	createuserbutton.addEventListener("click", createNewUser);
	createuserconent.appendChild(createuserbutton);

	//append main content div to docfrag
	docfrag.append(createuserconent);

	maincontentdiv.append(docfrag);

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