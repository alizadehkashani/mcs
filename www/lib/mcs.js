//ip adress of host
const ip = "127.0.0.1";


//runs functuion if DOM is loaded
function DOMready(callback){
	if(document.readyState === "complete" || document.readyState !== "loading"){
		callback();
	}else{
		document.addEventListener("DOMContentLoaded", callback);
	}
}


//clears all child nodes from an element
//input is string with id of the element
function clearid(elementid){	
	
	//get the node from the document by id
	let node = document.getElementById(elementid);
		
	//test if the element has childnodes
	while(node.hasChildNodes()){
		//delete last nodes until empty
		node.removeChild(node.lastChild);		
	}
}

//clears dom element of all child nodes
let cleareelement = (element) => {
	while(element.hasChildNodes()){

		//delete last nodes until empty
		element.removeChild(element.lastChild);		
	}
}

let creatediv = (argumentsobject) => {
	
	if(argumentsobject["type"] !== undefined){
		var div = document.createElement(argumentsobject["type"]);
	}else{
		var div = document.createElement("div");
	}

	//class
	if(argumentsobject["divclass"] !== undefined){
		for(let i = 0; i < argumentsobject["divclass"].length; i++){
			div.classList.add(argumentsobject["divclass"][i]);
		}
	}

	//inner text
	if(argumentsobject["divtext"] !== undefined){
		div.innerText = argumentsobject["divtext"];
	}

	//id
	if(argumentsobject["divid"] !== undefined){
		div.setAttribute("id", argumentsobject["divid"]);
	}

	//append to
	if(argumentsobject["appendto"] !== undefined){
		argumentsobject["appendto"].appendChild(div);
	}
	
	return div;
};

let toggledisplaydiv = (div, displaytype) => {
	if(div.style.display === ""){
		div.style.display = displaytype;
	}else{
		div.style.display = "";
	}
}

let changeelementvisibility = (div, visible, ismodal) => {
	if(visible){
		if(ismodal){
			div.style.transform = "translate(-50%, -50%) scale(1)";
		}else{
			div.style.transform = "scale(1)";
		}
	}else{
		if(ismodal){
			div.style.transform = "translate(-50%, -50%) scale(0)";
		}else{
			div.style.transform = "scale(0)";
		}
	}
}

let changeelementdisplay = (div, display) => {
	div.style.display = display;
}

let toggleoverlay = (active) => {
	
	let overlay = document.getElementById("overlay");

	if(active){
		overlay.classList.add("active");
	}else{
		overlay.classList.remove("active");
	}

}

let limitinput = (limit, inputfield) => {
	//debugger;

	//get current value of input field
	let currentvalue = inputfield.value;

	//get current length
	let currentlength = inputfield.value.length;

	if(currentlength > limit){
		currentvalue = currentvalue.substring(0, limit);
		return currentvalue;
	}else{
		return currentvalue
	}

}
