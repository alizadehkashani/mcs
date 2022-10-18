<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$input = json_decode($json, true);

	$response = [];

	$query = "
		DELETE FROM players
		WHERE tid = :tid 
		AND cid = :cid
		AND playernumber = :playernumber
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":cid", $input["cid"]);
	$sql->bindParam(":playernumber", $input["playernumber"]);
	$sql->execute();
	
	$response["result"] = 0;
	$response["message"] = "Spieler geloescht";
	
	echo(json_encode($response));

?>
