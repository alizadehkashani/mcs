<?php

	//require('../validatelogin.php');	
	include('../dbconfig.php');


	$query = " 
		SELECT currentgroup
		FROM tracks
		WHERE track = :trackid
		LIMIT 1
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":trackid", $_POST['trackid']);
	$sql->execute();
	$result = $sql->fetch(PDO::FETCH_ASSOC);

	echo(json_encode($result));

?>