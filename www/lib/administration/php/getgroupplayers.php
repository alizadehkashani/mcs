<?php
	//get db information
	require("../../../../lib/dbconfig.php");
	
	$data = file_get_contents("php://input");
	$input = json_decode($data, true);

	$response = [];

	$query = "
		SELECT 
			players.playernumber, 
			playersintournament.startnumber, 
			players.surname, 
			players.firstname, 
			groupplayers.playerorder
		FROM players 
		INNER JOIN groupplayers
		ON groupplayers.playernumber = players.playernumber
		INNER JOIN playersintournament
		ON groupplayers.playernumber = playersintournament.playernumber
		AND groupplayers.tid = playersintournament.tid
		WHERE groupplayers.groupid = :groupid
		ORDER BY groupplayers.playerorder ASC
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":groupid", $input["groupid"]);
	$sql->execute();
	$players = $sql->fetchAll();

	echo(json_encode($players));
?>

