<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$input = json_decode($json, true);

	$response = [];


	//delte round
	$query = "
		DELETE FROM rounds
		WHERE tid = :tid
		AND mid = :mid
		AND rid = :rid
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":mid", $input["mid"]);
	$sql->bindParam(":rid", $input["rid"]);
	$sql->execute();

	$response["result"] = 0;
	$response["message"] = "Runde geloescht";

	echo(json_encode($response));

?>
