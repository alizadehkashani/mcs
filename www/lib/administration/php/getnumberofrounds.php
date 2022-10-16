<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$input = json_decode($json, true);

	//check if there are already matchdays existing
	$query = "
		SELECT rnumber
		FROM rounds
		WHERE tid = :tid AND mdnumber = :mdnumber
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":mdnumber", $input["mdnumber"]);
	$sql->execute();
	$result = $sql->fetchAll(PDO::FETCH_ASSOC);

	$numberofrounds = $sql->rowCount();	

	echo(json_encode($numberofrounds));
?>