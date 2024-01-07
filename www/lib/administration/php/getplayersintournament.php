<?php
	//get db information
	require("../../../../lib/dbconfig.php");
	
	$data = file_get_contents("php://input");
	$input = json_decode($data, true);

	$response = [];

	//change select to new table
	$query = "
		SELECT 
		players.playernumber,
		playersintournament.startnumber,
		players.gender,
		players.firstname,
		players.surname,
		clubs.cname
		FROM playersintournament
		INNER JOIN players ON playersintournament.playernumber = players.playernumber
		INNER JOIN clubs ON players.cid = clubs.cid
		WHERE playersintournament.tid = :tid
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->execute();
	$players = $sql->fetchAll(PDO::FETCH_ASSOC);

	echo(json_encode($players));
?>
