<?php

	//require('../validatelogin.php');	
	include('../dbconfig.php');


	$query = " 
		SELECT * 
		FROM clubs
	";

	$sql = $dbconnection->prepare($query);
	$sql->execute();
	$result = $sql->fetchAll();

	echo(json_encode($result));

?>