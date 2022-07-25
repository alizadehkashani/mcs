let addEventListeners = () => {

}

let buildheader = () => {
	let administrationcontainer = document.getElementById("administration");

	let headercontainer = creatediv({
		divid: "headcontainer",
		appendto: administrationcontainer
	})

	creatediv({
		divid: "mcstext",
		appendto: headercontainer,
		divtext: "MCS"
	})
}

let buildnavigation = () => {
	let administrationcontainer = document.getElementById("administration");
	
	buildconstantnavigation(administrationcontainer);
	

}

let buildconstantnavigation = (maincontainer) => {
	let navigationcontainer = creatediv({
		divid: "navigationcontainer",
		appendto: maincontainer
	})

	let navigationconstantcontainer = creatediv({
		divid: "navigationconstantcontainer",
		appendto: navigationcontainer,
	})

	//settings
	let settingscontainer = creatediv({
		divclass: ["navigationitem"],
		appendto: navigationconstantcontainer
	})

	let settingsiconcontainer = creatediv({
		appendto: settingscontainer
	})

	settingscontainer.addEventListener("click", () =>{
		setselectednavigation(settingscontainer);
		buildsettings;
	})

	let settingsicon = document.createElement("img");
	settingsicon.setAttribute("src", "lib/administration/assets/settings.svg");
	settingsicon.classList.add("navigationicon");
	settingsiconcontainer.appendChild(settingsicon);

	let settingsdescription = creatediv({
		appendto: settingscontainer,
		divclass: ["flexleft", "navigationdescription"],
		divtext: "Einstellungen"
	})
}

let buildsettings = () => {

}

let setselectednavigation = (div) => {
	div.classList.add("selectednavigation");
}

DOMready(buildheader);
DOMready(buildnavigation);

DOMready(addEventListeners);