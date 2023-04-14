<?php
	//get db information
	require("../../../../lib/dbconfig.php");
	
	$data = file_get_contents("php://input");
	$input = json_decode($data, true);
	
	//array for response
	$response = [];

	//check if the matchday of the round is active
	$query = "SELECT *
		FROM matchdays
		WHERE tid = :tid
		AND mid = :mid
		";
	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":mid", $input["mid"]);
	$sql->execute();
	$tournament = $sql->fetch(PDO::FETCH_ASSOC);

	if($tournament["mdcurrent"] == 0){
		$response["result"] = 1;
		$response["message"] = "Spieltag ist nicht aktiv";
		echo(json_encode($response));
		exit();
	}

	//set all rounds not current
	$query = "
		UPDATE rounds
		SET rcurrent = :zero 
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindValue(":zero", 0);
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
