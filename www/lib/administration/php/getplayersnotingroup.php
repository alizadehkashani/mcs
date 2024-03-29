<?php
	//get db information
	require("../../../../lib/dbconfig.php");
	
	$data = file_get_contents("php://input");
	$input = json_decode($data, true);

	$response = [];

	$query = "
	SELECT players.playernumber, playersintournament.startnumber, players.surname, players.firstname 
	FROM players 
	INNER JOIN playersintournament
	ON players.playernumber = playersintournament.playernumber
	WHERE playersintournament.tid = :tid
	AND players.playernumber NOT IN(
		SELECT groupplayers.playernumber
		FROM groups
		INNER JOIN groupplayers 
		ON groupplayers.groupid = groups.groupid
		WHERE groups.tid = :tid
		AND groups.trackid = :trackid
		AND groups.mid = :mid
		AND groups.rid = :rid)
		ORDER BY playernumber ASC
		";


	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":trackid", $input["trackid"]);
	$sql->bindParam(":mid", $input["mid"]);
	$sql->bindParam(":rid", $input["rid"]);
	$sql->execute();
	$players = $sql->fetchAll();

	echo(json_encode($players));
?>
