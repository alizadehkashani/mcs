<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$input = json_decode($json, true);

	$response = [];

	$query = "
		UPDATE playersintournament
		SET startnumber = :startnumber
		WHERE tid = :tid
		AND playernumber = :playernumber
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":startnumber", $input["startnumber"]);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":playernumber", $input["playernumber"]);
	$sql->execute();

	$response["result"] = 0;
	$response["message"] = "Startnummer wurde geandert";
	
	echo(json_encode($response));

?>
