<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$input = json_decode($json, true);

	$response = [];

	//check whats the last round for tournament
	$query = "
		SELECT MAX(rnumber)
		FROM rounds
		WHERE tid = :tid AND mdnumber = :mdnumber
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":mdnumber", $input["mdnumber"]);
	$sql->execute();
	$maxmatchday = $sql->fetch(PDO::FETCH_ASSOC);

	if($maxmatchday["MAX(rnumber)"] == $input["rnumber"]){

		//delte round
		$query = "
			DELETE FROM rounds
			WHERE tid = :tid AND mdnumber = :mdnumber AND rnumber = :rnumber
		";

		$sql = $dbconnection->prepare($query);
		$sql->bindParam(":tid", $input["tid"]);
		$sql->bindParam(":mdnumber", $input["mdnumber"]);
		$sql->bindParam(":rnumber", $input["rnumber"]);
		$sql->execute();

		$response["result"] = 0;
		$response["message"] = "Runde geloescht";

	}else{

		$response["result"] = 1;
		$response["message"] = "Nur die letzte Runde kann geloescht werden";

	}

	echo(json_encode($response));

?>
