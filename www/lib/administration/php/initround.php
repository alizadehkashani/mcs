<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$data = json_decode($json, true);

	$result = [];
	
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
	$sql->bindParam(":tid", $data["tid"]);
	$sql->bindParam(":mid", $data["mid"]);
	$sql->bindParam(":rid", $data["rid"]);
	$sql->execute();
		
	//get tracks of tournament
	$query = "
		SELECT trackid
		FROM tracks
		WHERE tid = :tid
		";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $data["tid"]);
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
		$sql->bindParam(":tid", $data["tid"]);
		$sql->bindParam(":mid", $data["mid"]);
		$sql->bindParam(":rid", $data["rid"]);
		$sql->bindParam(":trackid", $tracks[$i]["trackid"]);
		$sql->execute();
		$result = $sql->fetch(PDO::FETCH_ASSOC);
	}

	$result["code"] = 0;
	$result["message"] = "Runden initialisiert";

	echo(json_encode($result));
?>
