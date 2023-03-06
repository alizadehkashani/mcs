<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$input = json_decode($json, true);

	$response = [];

	//delte rounds of that matchday
	$query = "
		DELETE FROM rounds
		WHERE tid = :tid AND mid = :mid
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":mid", $input["mid"]);
	$sql->execute();

	//delte matchday
	$query = "
		DELETE FROM matchdays
		WHERE tid = :tid AND mid = :mid
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":mid", $input["mid"]);
	$sql->execute();

	//TODO delete groups / delete group players

	$response["result"] = 0;
	$response["message"] = "Spieltag geloescht";

	echo(json_encode($response));

?>
