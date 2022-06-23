const tracks = ["A", "B"];

//initially sets the startgroups and players
async function setcurrentgroups(){

	let startgroup;
	let spanid;
	let span;

	let playercontainerid;
	let playercontainer;

	for(let i = 0; i < tracks.length; i++){
		
		//------------------------	
		//set stargroup numbers
		spanid = "group" + tracks[i];
		span = document.getElementById(spanid);

		startgroup = await getgroup(tracks[i]);

		span.innerText = startgroup;
		//------------------------
		//set players
		playercontainerid = "track" + tracks[i] + "playercontainer";
		playercontainer = document.getElementById(playercontainerid);
		
		playersdb = await getplayers(tracks[i]);
		
		for(let j = 0; j < playersdb.length; j++){
			let playernumber = document.createElement("div");
			playernumber.innerText = playersdb[j]['player'];
			playercontainer.appendChild(playernumber);

			let playerlastname = document.createElement("div");
			playerlastname.innerText = playersdb[j]['surname'];
			playercontainer.appendChild(playerlastname);

			let playerfirstname = document.createElement("div");
			playerfirstname.innerText = playersdb[j]['firstname'];
			playercontainer.appendChild(playerfirstname);
		}
	}
	
}

//

//check if startgroup changed on db and change on page if true
async function refreshstartgroups(){

	let startgrouponpage;
	let startgroupdb;
	let spanid;
	let span;
	
	for(let i = 0; i < tracks.length; i++){
			
		spanid = "group" + tracks[i];
		span = document.getElementById(spanid);

		startgrouponpage = span.innerText;

		startgroupdb = await getgroup(tracks[i]);

		if(startgrouponpage != startgroupdb){
			span.innerText = startgroupdb;

			let playercontainerid;
			let playercontainer;

			
			playercontainerid = "track" + tracks[i] + "playercontainer";
			playercontainer = document.getElementById(playercontainerid);
			
			clearNode(playercontainerid);

			playersdb = await getplayers(tracks[i]);
			
			for(let j = 0; j < playersdb.length; j++){
				let playernumber = document.createElement("div");
				playernumber.innerText = playersdb[j]['player'];
				playercontainer.appendChild(playernumber);

				let playerlastname = document.createElement("div");
				playerlastname.innerText = playersdb[j]['surname'];
				playercontainer.appendChild(playerlastname);

				let playerfirstname = document.createElement("div");
				playerfirstname.innerText = playersdb[j]['firstname'];
				playercontainer.appendChild(playerfirstname);
			}

		}

	}


}


async function getgroup(track){
	let currentgroup = await(ajaxCallPromise({
		url: "lib/display/getcurrentgroup.php",
		method: "POST",
		data: {track: track}
	}));

	return currentgroup['currentgroup'];

}

async function getplayers(track){
	let currentplayers = await(ajaxCallPromise({
		url: "lib/display/getcurrentplayers.php",
		method: "POST",
		data: {track: track}
	}));

	return currentplayers;
}


document.addEventListener("DOMContentLoaded", function(){
    setInterval(function(){
        refreshstartgroups();
    }, 5000)
});


DOMready(setcurrentgroups);