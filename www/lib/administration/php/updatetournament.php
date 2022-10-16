<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$data = json_decode($json, true);

	$response = [];

	$query = "
		UPDATE tournaments
		SET tname = :tname, tlocation = :tlocation
		WHERE tid = :tid
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tname", $data["description"]);
	$sql->bindParam(":tlocation", $data["location"]);
	$sql->bindParam(":tid", $data["tid"]);
	$sql->execute();
	
	$response["result"] = 0;
	$response["message"] = "Tournament changed";
	
	echo(json_encode($response));

?>