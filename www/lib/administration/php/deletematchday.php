<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$input = json_decode($json, true);

	$response = [];

	//check whats the last matchday for tournament
	$query = "
		SELECT MAX(mdnumber)
		FROM matchdays
		WHERE tid = :tid
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->execute();
	$maxmatchday = $sql->fetch(PDO::FETCH_ASSOC);

	if($maxmatchday["MAX(mdnumber)"] == $input["mdnumber"]){

		//delte rounds of that matchday
		$query = "
			DELETE FROM rounds
			WHERE tid = :tid AND mdnumber = :mdnumber
		";

		$sql = $dbconnection->prepare($query);
		$sql->bindParam(":tid", $input["tid"]);
		$sql->bindParam(":mdnumber", $input["mdnumber"]);
		$sql->execute();

		//delte matchday
		$query = "
			DELETE FROM matchdays
			WHERE tid = :tid AND mdnumber = :mdnumber
		";

		$sql = $dbconnection->prepare($query);
		$sql->bindParam(":tid", $input["tid"]);
		$sql->bindParam(":mdnumber", $input["mdnumber"]);
		$sql->execute();

		$response["result"] = 0;
		$response["message"] = "Spieltag geloescht";

	}else{

		$response["result"] = 1;
		$response["message"] = "Nur der letzte Spieltag kann geloescht werden";

	}

	echo(json_encode($response));

?>
