<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$data = json_decode($json, true);

	$response = [];

	$query = "
		UPDATE clubs
		SET cname = :cname
		WHERE cid = :cid
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":cname", $data["cname"]);
	$sql->bindParam(":cid", $data["cid"]);
	$sql->execute();
	
	$response["result"] = 0;
	$response["message"] = "Club changed";
	
	echo(json_encode($response));

?>
