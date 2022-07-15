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


function ajaxCallPromise(dataObject){
	
	//url
	//method
	//data



	if(dataObject.data == undefined){
		//is there is no data given to the ajaxcall
		var dataString = "";
	}else{
		//if there is data given to the ajaxcall
		
		//creates array with the keys of the data object
		dataObjectDataKeys = Object.keys(dataObject.data);
		
		//creates the data string
		var dataString = "?";
		for(i = 0; i < dataObjectDataKeys.length; i++){
			dataString += dataObjectDataKeys[i];
			dataString += "=";
			dataString += dataObject.data[dataObjectDataKeys[i]];
			dataString += "&";
		}

		//remove last "&" sign
		dataString = dataString.substring(0, dataString.length - 1);
	}

	//depending on send method
	//if GET, add data string to URL
	//if POST remove equal sign infront of data string
	if(dataObject.method == "GET"){
		dataObject.url = dataObject.url + dataString;
	}else if(dataObject.method == "POST"){
		dataString = dataString.substring(1, dataString.length);
	}

	//return new promise
	return new Promise(function(resolve, reject){
		let xhr = new XMLHttpRequest();
		xhr.open(dataObject.method, dataObject.url, true);
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.setRequestHeader('Cache-Control', 'no-cache');
		xhr.onload = function(){
			if(xhr.status >= 200 && xhr.status < 300){
				resolve(JSON.parse(xhr.responseText));
			}else{
				reject({
					status: xhr.status,
					statusText: xhr.responseText
				})
			}
		}

		//depending on send method send xhr
		if(dataObject.method == 'POST'){
			xhr.send(dataString);
		}else{
			xhr.send();
		}
	});
}


//clears all child nodes from an element
//input is string with id of the element
function clearNode(elementid){
	
	
	//get the node from the document by id
	let node = document.getElementById(elementid);
		
	//test if the element has childnodes
		while(node.hasChildNodes()){

			//delete last nodes until empty
			node.removeChild(node.lastChild);		
		}
}

//clears dom element of all child nodes
let clearNodeElement = (element) => {
	while(element.hasChildNodes()){

		//delete last nodes until empty
		element.removeChild(element.lastChild);		
	}
}

//creates object from array
function arrayToObject(sourceArray){
	let targetObject = {};
	keys = Object.keys(sourceArray);
	
	for(i = 0 ; i < sourceArray.length; i++){
		targetObject[keys[i]] = sourceArray[i];
	}
	return targetObject;
}

let creatediv = (argumentsobject) => {
	let div = document.createElement("div");

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


let gettrackdescription = async(trackid) => {
	let trackdescription = await(ajaxCallPromise({
		url: "/mcs/lib/gettrackdescription.php", 
		method: "POST",
		data: {trackid: trackid}
	}))

	return trackdescription;

};
