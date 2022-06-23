<?php

	//require('../validatelogin.php');	
	include('../dbconfig.php');


	$sql = $dbconnection->prepare("SELECT currentgroup FROM tracks WHERE track = :track");
	$sql->bindParam(":track", $_POST['track']);
	$sql->execute();
	$currentgroup = $sql->fetch(PDO::FETCH_ASSOC);

	echo(json_encode($currentgroup));


?>