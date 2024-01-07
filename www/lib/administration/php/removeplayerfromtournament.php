<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$input = json_decode($json, true);

	$response = [];

	//delete player from any existing groups
	$query = "
		DELETE FROM groupplayers
		WHERE playernumber = :playernumber
		AND tid = :tid
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":playernumber", $input["playernumber"]);
	$sql->execute();

	//delete player assigned to tournaments
	$query = "
		DELETE FROM playersintournament
		WHERE playernumber = :playernumber
		AND tid = :tid
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":playernumber", $input["playernumber"]);
	$sql->execute();

	$response["result"] = 0;
	$response["message"] = "Spieler von Turneir entfernt";
	
	echo(json_encode($response));

?>
