<?php
	//get db information
	require("../../../../lib/dbconfig.php");
	
	$data = file_get_contents("php://input");
	$input = json_decode($data, true);

	$response = [];

	//change select to new table
	$query = "
		SELECT players.playernumber, players.surname, players.firstname, clubs.cname
		FROM players
		INNER JOIN clubs ON players.cid = clubs.cid
		WHERE players.playernumber NOT IN
			(SELECT playernumber
				FROM playersintournament
				WHERE tid = :tid)
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->execute();
	$players = $sql->fetchAll();

	echo(json_encode($players));
?>

