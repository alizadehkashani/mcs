<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$data = json_decode($json, true);

	$response = [];

	$active = 1;
	
	$query = "
		INSERT INTO tournaments (description, location, active)
		VALUES (:description, :location, :active)
	";
	
	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":description", $data["description"]);
	$sql->bindParam(":location", $data["description"]);
	$sql->bindParam(":active", $active);
	$sql->execute();
	
	$response["result"] = 0;
	$response["message"] = "Tournament created";

	echo(json_encode($response));
?>