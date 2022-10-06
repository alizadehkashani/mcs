<?php
	//get db information
	require("../../../../lib/dbconfig.php");
	
	$data = file_get_contents("php://input");
	$input = json_decode($data, true);

	$response = [];

	$query = "
		SELECT *
		FROM players
		WHERE tid = :tid AND playernumber = :playernumber 
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":playernumber", $input["playernumber"]);
	$sql->execute();
	$player = $sql->fetch(PDO::FETCH_ASSOC);

	echo(json_encode($player));
?>