<?php
	//get db information
	require("../../../../lib/dbconfig.php");
	
	$data = file_get_contents("php://input");
	$input = json_decode($data, true);

	$response = [];


	$query = "
		SELECT *
		FROM players
	";

	$sql = $dbconnection->prepare($query);
	$sql->execute();
	$players = $sql->fetchAll(PDO::FETCH_ASSOC);

	echo(json_encode($players));
?>
