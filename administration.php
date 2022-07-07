<?php
    //require('lib/validatelogin.php');
?>

<html>
    <head>
        <link rel="stylesheet" type="text/css" href="lib/mcs.css"></script>
        <link rel="stylesheet" type="text/css" href="lib/administration/administration.css"></script>
        <link rel="stylesheet" type="text/css" href="lib/administration/clubs.css"></script>
        <link rel="stylesheet" type="text/css" href="lib/administration/players.css"></script>
        <script src="lib/mcs.js"></script>
        <script src="lib/administration/administration.js"></script>
        <title>Administration</title>        
    </head>
    <body>
        <div id="container">
            <div id="mcslogo">
				<img id="mcslogo" src="lib/assets/mcslogo.jpg" alt="MCS Logo">
			</div>
			<div id="header"></div>
			<div id="navigation">
                <div id="startgroupsdiv"class="navigationbutton">Startgruppen</div>
                <div id="importgroupdiv"class="navigationbutton">Daten Import</div>
                <div id="createuserdiv"class="navigationbutton">Benutzer anlegen</div>
				<div id="deleteuserdiv"class="navigationbutton">Benutzer löschen</div>
				<div id="clubsdiv"class="navigationbutton">Vereine</div>
				<div id="playersdiv"class="navigationbutton">Spieler</div>
			</div>
			<div id="maincontent"></div>
        </div>
    </body>
</html>