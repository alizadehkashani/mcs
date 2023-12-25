<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$input = json_decode($json, true);

	$response = [];

	//delete players in groups of that matchday
	$query = "
		DELETE FROM groupplayers
		WHERE groupid IN 
			(SELECT groupid FROM groups
				WHERE tid = :tid 
				AND mid = :mid)

	";

	//delete groups of  that matchday
	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":mid", $input["mid"]);
	$sql->execute();
	
	$query = "
		DELETE FROM groups
		WHERE tid = :tid AND mid = :mid
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":mid", $input["mid"]);
	$sql->execute();

	//delte rounds of that matchday
	$query = "
		DELETE FROM rounds
		WHERE tid = :tid AND mid = :mid
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":mid", $input["mid"]);
	$sql->execute();

	//delete matchday
	$query = "
		DELETE FROM matchdays
		WHERE tid = :tid AND mid = :mid
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":mid", $input["mid"]);
	$sql->execute();

	$response["result"] = 0;
	$response["message"] = "Spieltag geloescht";

	echo(json_encode($response));

?>
