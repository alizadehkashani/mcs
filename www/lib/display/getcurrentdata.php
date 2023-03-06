<?php
	//get db information
	require("../../../lib/dbconfig.php");
	
	$data = file_get_contents("php://input");
	$input = json_decode($data, true);

	$response = [];
	
	//get tracks of tournament
	$query = "
		SELECT tracks.trackid, tournaments.tid
		FROM tracks
		INNER JOIN tournaments ON tracks.tid = tournaments.tid
		WHERE tournaments.tcurrent = :one
		";

	$sql = $dbconnection->prepare($query);
	//$sql->bindParam(":tid", $data["tid"]);
	$sql->bindValue(":one", 1);
	$sql->execute();
	$tracks = $sql->fetchAll(PDO::FETCH_ASSOC);	


	//loop through tracks and get players
	for($i = 0; $i < count($tracks); $i++){

		$query = "
			SELECT groups.trackid, players.playernumber
			FROM groups 
			INNER JOIN groupplayers ON groups.groupid = groupplayers.groupid
			INNER JOIN players ON players.playernumber = groupplayers.playernumber
			INNER JOIN matchdays on groups.mdnumber = matchdays.mdnumber
			INNER JOIN rounds on groups.rnumber = rounds.rnumber
			WHERE groups.tid = :tid 
			AND groups.currentgroup = :one 
			AND groups.trackid = :trackid
			AND matchdays.mdcurrent = :one
			AND rounds.rcurrent = :one
			";
		/* 
		$query = "
			SELECT groups.trackid, players.playernumber
			FROM groups 
			INNER JOIN groupplayers ON groups.groupid = groupplayers.groupid
			INNER JOIN players ON players.playernumber = groupplayers.playernumber
			INNER JOIN matchdays on groups.mdnumber = matchdays.mdnumber
			INNER JOIN rounds on groups.rnumber = rounds.rnumber
			WHERE groups.tid = :tid 
			AND groups.currentgroup = :one 
			AND groups.trackid = :trackid
			AND matchdays.mdcurrent = :one
			AND rounds.rcurrent = :one
			";
		*/

		$sql = $dbconnection->prepare($query);
		$sql->bindParam(":tid", $tracks[$i]["tid"]);
		$sql->bindValue(":one", 1);
		$sql->bindParam(":trackid", $tracks[$i]["trackid"]);
		$sql->execute();
		$players = $sql->fetchAll(PDO::FETCH_ASSOC);

		$response[$i] = $players;
		print_r($players);
	}


	//echo(json_encode($response));
?>

