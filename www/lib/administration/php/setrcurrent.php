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

	//start initialize round
	
	//reset all current groups of round
	$query = "
		UPDATE groups
		SET currentgroup = :zero
		WHERE tid = :tid
		AND mid = :mid
		AND rid = :rid
		";

	$sql = $dbconnection->prepare($query);
	$sql->bindValue(":zero", 0);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":mid", $input["mid"]);
	$sql->bindParam(":rid", $input["rid"]);
	$sql->execute();
		
	//get tracks of tournament
	$query = "
		SELECT trackid
		FROM tracks
		WHERE tid = :tid
		";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->execute();
	$tracks = $sql->fetchAll(PDO::FETCH_ASSOC);	

	//loop through tracks and set first group to current group
	for($i = 0; $i < count($tracks); $i++){

		//get first round
		$query = "
			UPDATE groups 
			SET currentgroup = :one
			WHERE tid = :tid
			AND mid = :mid
			AND rid = :rid 
			AND trackid = :trackid
			AND groupid =
				(SELECT groupid
					FROM groups
					WHERE tid = :tid
					AND trackid = :trackid
					AND mid = :mid
					AND rid = :rid 
					ORDER BY grouporder ASC
					LIMIT 1)
					
			";

		$sql = $dbconnection->prepare($query);
		$sql->bindValue(":one", 1);
		$sql->bindParam(":tid", $input["tid"]);
		$sql->bindParam(":mid", $input["mid"]);
		$sql->bindParam(":rid", $input["rid"]);
		$sql->bindParam(":trackid", $tracks[$i]["trackid"]);
		$sql->execute();
		$result = $sql->fetch(PDO::FETCH_ASSOC);
	}
	//end initialize round
	
	$response["result"] = 0;
	$response["message"] = "Runde aktiv";

	echo(json_encode($response));
?>
