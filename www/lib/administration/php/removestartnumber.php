<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$input = json_decode($json, true);

	$response = [];

	$query = "
		UPDATE playersintournament
		SET startnumber = NULL
		WHERE tid = :tid
		AND playernumber = :playernumber
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":playernumber", $input["playernumber"]);
	$sql->execute();

	$response["result"] = 0;
	$response["message"] = "Startnummer wurde geloescht";
	
	echo(json_encode($response));

?>
