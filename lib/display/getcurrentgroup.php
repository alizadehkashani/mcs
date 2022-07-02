<?php

	//require('../validatelogin.php');	
	include('../dbconfig.php');



	$query = " 
		SELECT groups.startgroup
		FROM groups
		JOIN tracks ON groups.startorder = tracks.currentgroup
		WHERE tracks.track = :track
		LIMIT 1
	";

	echo($query);

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":track", $_POST['track']);
	$sql->execute();
	$currentgroup = $sql->fetch(PDO::FETCH_ASSOC);

	echo(json_encode($currentgroup));


?>