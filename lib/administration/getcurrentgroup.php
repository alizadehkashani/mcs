<?php

	require('../validatelogin.php');	
	include('../dbconfig.php');


	$query = " 
		SELECT groups.startgroup
		FROM groups
		JOIN tracks ON groups.startorder = tracks.currentgroup
		WHERE tracks.track = :trackid
		LIMIT 1
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":trackid", $_POST['trackid']);
	$sql->execute();
	$result = $sql->fetch(PDO::FETCH_ASSOC);

	echo(json_encode($result));

?>