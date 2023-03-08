console.log("hi");

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

DOMready(getcurrentdata());
