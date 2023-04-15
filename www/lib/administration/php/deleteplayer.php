<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$input = json_decode($json, true);

	$response = [];

	//delete player from any existing groups
	$query = "
		DELETE FROM groupplayers;
		WHERE tid = :tid 
		AND playernumber = :playernumber
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":playernumber", $input["playernumber"]);
	$sql->execute();
	
	//delete player from player master
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
