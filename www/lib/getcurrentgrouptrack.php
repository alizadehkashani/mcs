<?php
	//get db information
	require("../../lib/dbconfig.php");
	
	$data = file_get_contents("php://input");
	$input = json_decode($data, true);

	//get tournament information
	$query = "
		SELECT tracks.trackid, groups.groupid 
		FROM tournaments
		INNER JOIN matchdays ON tournaments.tid = matchdays.tid
		INNER JOIN rounds 
			ON tournaments.tid = rounds.tid
			AND matchdays.mid = rounds.mid
		INNER JOIN groups 
			ON tournaments.tid = groups.tid
			AND matchdays.mid = groups.mid
			AND rounds.rid = groups.rid
		INNER JOIN tracks 
			ON tournaments.tid = tracks.tid
			AND tracks.trackid = groups.trackid
		WHERE tournaments.tcurrent = :one
		AND matchdays.mdcurrent = :one
		AND rounds.rcurrent = :one
		AND groups.currentgroup = :one
		ORDER BY tracks.trackid ASC
		";

	$sql = $dbconnection->prepare($query);
	$sql->bindValue(":one", 1);
	$sql->execute();
	$tracks = $sql->fetchAll(PDO::FETCH_ASSOC);	
	

	echo(json_encode($tracks));
?>
