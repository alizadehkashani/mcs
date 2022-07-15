<?php

	//require('../validatelogin.php');	
	include('dbconfig.php');


	$query = " 
		SELECT trackdescription
		FROM tracks
		WHERE track = :trackid
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":trackid", $_POST['trackid']);
	$sql->execute();
	$result = $sql->fetch(PDO::FETCH_ASSOC);

	echo(json_encode($result));

?>