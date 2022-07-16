<?php

	//require('../validatelogin.php');	
	include('../dbconfig.php');

	$trackidA = "A";
	$trackidB = "B";

	$query = " 
		SELECT trackdescription
		FROM tracks
		WHERE track = :trackid
	";

	//get track A description
	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":trackid", $trackidA);
	$sql->execute();
	$result = $sql->fetch(PDO::FETCH_ASSOC);

	$trackAdescription = $result["trackdescription"];
	
	//get track B description
	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":trackid", $trackidB);
	$sql->execute();
	$result = $sql->fetch(PDO::FETCH_ASSOC);

	$trackBdescription = $result["trackdescription"];

	$query = " 
		UPDATE tracks
		SET trackdescription = :trackdescription
		WHERE track = :trackid
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":trackdescription", $trackBdescription);
	$sql->bindParam(":trackid", $trackidA);
	$sql->execute();

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":trackdescription", $trackAdescription);
	$sql->bindParam(":trackid",$trackidB );
	$sql->execute();

	echo(json_encode("tracks swapped"));
?>