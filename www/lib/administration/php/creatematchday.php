<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$data = json_decode($json, true);

	//empty array for php response
	$response = [];

	//check if there are already matchdays existing
	$query = "
		SELECT mdnumber
		FROM matchdays
		WHERE tid = :tid
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $data["tid"]);
	$sql->execute();
	$result = $sql->fetchAll(PDO::FETCH_ASSOC);

	$numberofmatchdays = $sql->rowCount();
	
	if($numberofmatchdays == 0){//currently no matchdays are existing
		//if there are no matchdays, set matchday to one
		$nextmatchday = 1;
		
	}else{//matchdays are existing

		//get max matchday
		$query = "
		SELECT MAX(mdnumber)
		FROM matchdays
		WHERE tid = :tid
		";
		
		$sql = $dbconnection->prepare($query);
		$sql->bindParam(":tid", $data["tid"]);
		$sql->execute();
		$result = $sql->fetchAll(PDO::FETCH_ASSOC);
		
		//set metachday to current matchday plus one
		$nextmatchday = $result[0]["MAX(mdnumber)"] + 1;

	}

	//insert new matchday
	$query = "
		INSERT INTO matchdays (tid, mdnumber)
		VALUES (:tid, :mdnumber)
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $data["tid"]);
	$sql->bindParam(":mdnumber", $nextmatchday);
	$sql->execute();

	$newmid = $dbconnection->lastInsertId();

	$response["result"] = 0;
	$response["tid"] = $data["tid"];
	$response["mid"] = $newmid;
	$response["mdorder"] = $nextmatchday;
	$response["numberofmatchdays"] = $numberofmatchdays;
	$response["mdcurrent"] = 0;
	
	echo(json_encode($response));
?>
