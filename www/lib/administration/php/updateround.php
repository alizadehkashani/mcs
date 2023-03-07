<?php

	//get db information
	require("../../../../lib/dbconfig.php");
	
	$data = file_get_contents("php://input");
	$input = json_decode($data, true);
		
	//array for response
	$response = [];

	//update round
	$query = "
		UPDATE rounds
		SET rdescription = :rdescription
		WHERE tid = :tid 
		AND mid = :mid 
		AND rid = :rid
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":mid", $input["mid"]);
	$sql->bindParam(":rid", $input["rid"]);
	$sql->bindParam(":rdescription", $input["rdescription"]);
	$sql->execute();

	$response["result"] = 0;

	echo(json_encode($response));

?>
