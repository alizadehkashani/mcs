<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$data = json_decode($json, true);

	$response = [];

	$active = 1;
	
	$query = "
		INSERT INTO tournaments (tname, tlocation, tactive)
		VALUES (:tname, :tlocation, :tactive)
	";
	
	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tname", $data["description"]);
	$sql->bindParam(":tlocation", $data["location"]);
	$sql->bindParam(":tactive", $active);
	$sql->execute();
	
	$response["result"] = 0;
	$response["message"] = "Turnier angelegt";

	echo(json_encode($response));
?>