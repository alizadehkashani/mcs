<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$data = json_decode($json, true);

	$response = [];

	$query = "
		UPDATE tournaments
		SET description = :description, location = :location
		WHERE tid = :tid
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":description", $data["description"]);
	$sql->bindParam(":location", $data["location"]);
	$sql->bindParam(":tid", $data["tid"]);
	$sql->execute();
	
	$response["result"] = 0;
	$response["message"] = "Tournament changed";
	
	echo(json_encode($response));

?>