<?php
	//get db information
	require("../../../../lib/dbconfig.php");
	
	$data = file_get_contents("php://input");
	$input = json_decode($data, true);

	//query to select tracks of tournament
	$query = "
		SELECT *
		FROM tracks
		WHERE tid = :tid
	";
	
	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->execute();
	$sqlresult = $sql->fetchAll(PDO::FETCH_ASSOC);

	echo(json_encode($sqlresult));

?>