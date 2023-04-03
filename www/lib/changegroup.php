<?php
	require("../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$data = json_decode($json, true);

	$response = [];

	//get data of current group
	$query = "SELECT * FROM groups
		WHERE tid = :tid
		AND mid = :mid
		AND rid = :rid
		AND trackid = :trackid
		AND currentgroup = :one
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $data["tid"]);
	$sql->bindParam(":mid", $data["mid"]);
	$sql->bindParam(":rid", $data["rid"]);
	$sql->bindParam(":trackid", $data["trackid"]);
	$sql->bindValue(":one", 1);
	$sql->execute();
	$currentgroupdata = $sql->fetch(PDO::FETCH_ASSOC);
	
	//direction in which the group should be moved
	//if direction is 0 then the group will be moved up
	//if direction is 1 then the group will be moved down
	if($data["direction"] == 0){
		$operand = "<";
		$order = "DESC";
	}else{
		$operand = ">";
		$order = "ASC";
	}

	//get the group above/below the current group
	$query = "SELECT groupid, grouporder FROM groups
		WHERE tid = :tid
		AND trackid = :trackid
		AND mid = :mid
		AND rid = :rid
		AND grouporder" . $operand . ":grouporder
		ORDER BY grouporder " . $order .
		" LIMIT 1
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $currentgroupdata["tid"]);
	$sql->bindParam(":trackid", $currentgroupdata["trackid"]);
	$sql->bindParam(":mid", $currentgroupdata["mid"]);
	$sql->bindParam(":rid", $currentgroupdata["rid"]);
	$sql->bindParam(":grouporder", $currentgroupdata["grouporder"]);
	$sql->execute();
	$result = $sql->fetch(PDO::FETCH_ASSOC);

	print_r($result);

	if($sql->rowCount() > 0){//if a player is found

		//set currentgroup not current group
		$query = "UPDATE groups 
			SET currentgroup = :zero 
			WHERE groupid = :groupid 
			";

		$sql = $dbconnection->prepare($query);
		$sql->bindParam(":groupid", $currentgroupdata["groupid"]);
		$sql->bindValue(":zero", 0);
		$sql->execute();

		//set next/previous group current group
		$query = "UPDATE groups 
			SET currentgroup = :one 
			WHERE groupid = :groupid 
			";

		$sql = $dbconnection->prepare($query);
		$sql->bindParam(":groupid", $result["groupid"]);
		$sql->bindValue(":one", 1);
		$sql->execute();

		$response["result"] = 0;
		$response["message"] = "group changed";

		//get players from new current group
		$query = "
			SELECT players.playernumber, players.surname, players.firstname
			FROM groups 
			INNER JOIN groupplayers ON groups.groupid = groupplayers.groupid
			INNER JOIN players ON groupplayers.playernumber = players.playernumber
			WHERE groups.groupid = :currentgroup
			ORDER BY groupplayers.playerorder ASC
			";

		$sql = $dbconnection->prepare($query);
		$sql->bindParam(":currentgroup", $result["groupid"]);
		$sql->execute();
		$players = $sql->fetchAll(PDO::FETCH_ASSOC);

		$response["current"] = $players;

		//determine next group
		//get all data from next group
		$query = "
			SELECT groups.groupid, players.playernumber, players.surname, players.firstname
			FROM groups 
			INNER JOIN groupplayers ON groups.groupid = groupplayers.groupid
			INNER JOIN players ON groupplayers.playernumber = players.playernumber
			WHERE groups.groupid = (
						SELECT groupid
						FROM groups
						WHERE rid = :currentrid 
						AND trackid = :currenttrack
						AND grouporder > :currentgrouporder 
						ORDER BY grouporder ASC
						LIMIT 1
						)
			ORDER BY groupplayers.playerorder ASC
			";

		$sql = $dbconnection->prepare($query);
		$sql->bindParam(":currentrid", $data["rid"]);
		$sql->bindParam(":currenttrack", $data["trackid"]);
		$sql->bindParam(":currentgrouporder", $result["grouporder"]);
		$sql->execute();
		$players = $sql->fetchAll(PDO::FETCH_ASSOC);

		$response["next"] = $players;


	}else{//if there is no group above/below
		$response["result"] = 1;
		$response["message"] = "kein gruppe gefunden";
	}
	
	echo(json_encode($response));
?>
