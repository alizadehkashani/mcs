<?php
	//get db information
	require("../../lib/dbconfig.php");
	
	$data = file_get_contents("php://input");
	$input = json_decode($data, true);

	$response = [];
	
	
	//get current groups of the active tournament
	$query = "
		SELECT tracks.trackid, tracks.trackdescription
		FROM tracks
		INNER JOIN tournaments ON tracks.tid = tournaments.tid
		WHERE tournaments.tcurrent = :one
		ORDER BY tracks.trackid
		";


	$sql = $dbconnection->prepare($query);
	$sql->bindValue(":one", 1);
	$sql->execute();
	$tracks = $sql->fetchAll(PDO::FETCH_ASSOC);	

	$response["tracks"] = $tracks;

	//get current groups of the active tournament
	$query = "
		SELECT tournaments.tid, tracks.trackid, groups.groupid, rounds.rid, groups.grouporder
		FROM tournaments
		INNER JOIN matchdays ON tournaments.tid = matchdays.tid
		INNER JOIN rounds ON matchdays.mid = rounds.mid
		INNER JOIN groups ON groups.rid = rounds.rid
		INNER JOIN tracks ON groups.trackid = tracks.trackid
		WHERE tournaments.tcurrent = :one
		AND matchdays.mdcurrent = :one
		AND rounds.rcurrent = :one
		AND groups.currentgroup = :one
		ORDER BY tracks.trackid
		";


	$sql = $dbconnection->prepare($query);
	$sql->bindValue(":one", 1);
	$sql->execute();
	$groups = $sql->fetchAll(PDO::FETCH_ASSOC);	
	
	//loop through tracks and get players
	for($i = 0; $i < count($groups); $i++){

		//get current group
		$query = "
			SELECT players.playernumber, players.surname, players.firstname
			FROM groups 
			INNER JOIN groupplayers ON groups.groupid = groupplayers.groupid
			INNER JOIN players ON groupplayers.playernumber = players.playernumber
			WHERE groups.groupid = :currentgroup
			ORDER BY groupplayers.playerorder ASC
			";

		$sql = $dbconnection->prepare($query);
		$sql->bindParam(":currentgroup", $groups[$i]["groupid"]);
		$sql->execute();
		$players = $sql->fetchAll(PDO::FETCH_ASSOC);

		$response["current"][$i] = $players;

		//get next group
		$query = "
			SELECT players.playernumber, players.surname, players.firstname
			FROM groups 
			INNER JOIN groupplayers ON groups.groupid = groupplayers.groupid
			INNER JOIN players ON groupplayers.playernumber = players.playernumber
			WHERE groups.groupid = (
						SELECT groupid
						FROM groups
						WHERE rid = :currentrid 
						AND grouporder > :currentgrouporder 
						ORDER BY grouporder ASC
						LIMIT 1
						)
			ORDER BY groupplayers.playerorder ASC
			";

		$sql = $dbconnection->prepare($query);
		$sql->bindParam(":currentrid", $groups[$i]["rid"]);
		$sql->bindParam(":currentgrouporder", $groups[$i]["grouporder"]);
		$sql->execute();
		$players = $sql->fetchAll(PDO::FETCH_ASSOC);

		$response["next"][$i] = $players;
	}


	echo(json_encode($response));
?>

