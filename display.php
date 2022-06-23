<?php
    
?>

<html>
    <head>
        <link rel="stylesheet" type="text/css" href="lib/mcs.css"></script>
        <link rel="stylesheet" type="text/css" href="lib/display/display.css"></script>
        <script src="lib/mcs.js"></script>
        <script src="lib/display/display.js"></script>
        <title>Display</title>        
    </head>
    <body>
		<div id="maincontainer">
			<div id="header"></div>
			<div id="tracks">
				<div class="groupheader">
					<div class="groupdescription">Anlage A - Filz</div>
					<div class="currentgroup"><span>Startgruppe </span><span id="groupA">3</span></div>
				</div>
				<div class="groupheader">
					<div class="groupdescription">Anlage B - Miniaturgolf</div>
					<div class="currentgroup"><span>Startgruppe </span><span id="groupB">3</span></div>
				</div>
			</div>
			<div id="startgroupscontainer">
				<div id="trackAplayercontainer" class="playercontainer"></div>
				<div id="trackBplayercontainer" class="playercontainer"></div>
			</div>
			<div id="footer">
				<img id="mcslogo" src="lib/assets/mcslogo_large_no_text.jpg">
			</div>
		</div>
    </body>
</html>