<?php

	ini_set('display_errors', 1);

	//get db information
	require("../../../../lib/dbconfig.php");
	
	$data = file_get_contents("php://input");
	$input = json_decode($data, true);
		
	//array for response
	$response = [];

	//update matchday
	$query = "
		UPDATE matchdays
		SET mddescription = :mddescription
		WHERE tid = :tid AND mid = :mid
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":mid", $input["mid"]);
	$sql->bindParam(":mddescription", $input["mddescription"]);
	$sql->execute();

	$response["result"] = 0;

	echo(json_encode($response));

?>
