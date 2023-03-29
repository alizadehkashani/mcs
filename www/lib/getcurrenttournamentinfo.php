<?php
	//get db information
	require("../../lib/dbconfig.php");
	
	ini_set('display_errors', 1);

	$data = file_get_contents("php://input");
	$input = json_decode($data, true);
	
	//get tournament information
	$query = "
		SELECT tournaments.tid, matchdays.mid, rounds.rid
		FROM tournaments
		LEFT JOIN matchdays ON tournaments.tid = matchdays.tid
		LEFT JOIN rounds ON tournaments.tid = rounds.tid
		WHERE tournaments.tcurrent = :one
		AND matchdays.mdcurrent = :one
		AND rounds.rcurrent = :one	
		";


	$sql = $dbconnection->prepare($query);
	$sql->bindValue(":one", 1);
	$sql->execute();
	$tinfo = $sql->fetch(PDO::FETCH_ASSOC);	

	echo(json_encode($tinfo));
?>

