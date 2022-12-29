<?php
	//get db information
	require("../../../../lib/dbconfig.php");
	
	$data = file_get_contents("php://input");
	$input = json_decode($data, true);

	$response = [];

	$query = "
		SELECT players.playernumber, players.surname, players.firstname 
		FROM players 
		INNER JOIN groupplayers
		ON groupplayers.playernumber = players.playernumber
		WHERE groupplayers.groupid = :groupid
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":groupid", $input["groupid"]);
	$sql->execute();
	$players = $sql->fetchAll();

	echo(json_encode($players));
?>

