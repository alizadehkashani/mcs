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
			url: "/mcs/lib/admin/createnewuser.php",
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
			url: "/mcs/lib/admin/deleteuser.php",
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
DOMready(buildDeleteUser);
//test

DOMready(addEventListeners);