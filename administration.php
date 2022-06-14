<?php
    require('lib/validatelogin.php');
?>

<html>
    <head>
        <link rel="stylesheet" type="text/css" href="lib/mcs.css"></script>
        <link rel="stylesheet" type="text/css" href="lib/administration/administration.css"></script>
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
                <div id="importgroupdiv"class="navigationbutton">Import Groups</div>
                <div id="createuserdiv"class="navigationbutton">Create User</div>
				<div id="deleteuserdiv"class="navigationbutton">Delete User</div>
			</div>
			<div id="maincontent"></div>
        </div>
    </body>
</html>