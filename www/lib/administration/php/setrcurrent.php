<?php
	//get db information
	require("../../../../lib/dbconfig.php");
	
	$data = file_get_contents("php://input");
	$input = json_decode($data, true);
	
	//array for response
	$response = [];

	//set currently active round not current
	$query = "
		UPDATE rounds
		SET rcurrent = :zero 
		WHERE tid = :tid 
		AND mid = :mid 
		AND rcurrent = :one
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":mid", $input["mid"]);
	$sql->bindValue(":zero", 0);
	$sql->bindValue(":one", 1);
	$sql->execute();
	
	//set new round current	
	$query = "
		UPDATE rounds
		SET rcurrent = :rcurrent 
		WHERE tid = :tid 
		AND mid = :mid 
		AND rid = :rid
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":mid", $input["mid"]);
	$sql->bindParam(":rid", $input["rid"]);
	$sql->bindValue(":rcurrent", 1);
	$sql->execute();
	
	$response["result"] = 0;
	$response["message"] = "Runde aktiv";

	echo(json_encode($response));

?>

