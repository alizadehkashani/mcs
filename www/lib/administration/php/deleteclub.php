<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$data = json_decode($json, true);

	$response = [];

	$query = "
		DELETE FROM clubs
		WHERE tid = :tid AND cid = :cid
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $data["tid"]);
	$sql->bindParam(":cid", $data["cid"]);
	$sql->execute();
	
	$response["result"] = 0;
	$response["message"] = "Club deleted";
	
	echo(json_encode($response));

?>