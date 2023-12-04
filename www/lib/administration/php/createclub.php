<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$data = json_decode($json, true);

	$response = [];

		
	$query = "
		INSERT INTO clubs (cname)
		VALUES (:cname)
	";
	
	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":cname", $data["cname"]);
	$sql->execute();
	
	$response["result"] = 0;
	$response["message"] = "Verein angelegt";

	echo(json_encode($response));
?>
