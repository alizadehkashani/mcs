<?php
	//get db information
	require("../../../../lib/dbconfig.php");
	
	$data = file_get_contents("php://input");
	$input = json_decode($data, true);

	$response = [];

	//change select to new table
	$query = "
		SELECT *
		FROM playersintournament
		WHERE tid = :tid
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->execute();
	$players = $sql->fetchAll(PDO::FETCH_ASSOC);

	echo(json_encode($players));
?>