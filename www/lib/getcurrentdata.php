<?php
	//get db information
	require("../../lib/dbconfig.php");
	
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
			SELECT groups.groupid, groupplayers.playernumber, players.surname, players.firstname
			FROM groups 
			INNER JOIN tournaments ON groups.tid = tournaments.tid
			INNER JOIN matchdays ON groups.mid = matchdays.mid
			INNER JOIN rounds ON groups.rid = rounds.rid
			INNER JOIN tracks ON groups.trackid = tracks.trackid
			INNER JOIN groupplayers ON groups.groupid = groupplayers.groupid
			INNER JOIN players ON groupplayers.playernumber = players.playernumber
			WHERE tournaments.tcurrent = :one
			AND groups.currentgroup = :one
			AND matchdays.mdcurrent = :one
			AND rounds.rcurrent = :one
			AND tracks.trackid = :trackid
			ORDER BY groupplayers.playerorder ASC
			";

		$sql = $dbconnection->prepare($query);
		$sql->bindValue(":one", 1);
		$sql->bindParam(":trackid", $tracks[$i]["trackid"]);
		$sql->execute();
		$players = $sql->fetchAll(PDO::FETCH_ASSOC);

		$response[$i] = $players;
		print_r($players);
	}


	//echo(json_encode($response));
?>

