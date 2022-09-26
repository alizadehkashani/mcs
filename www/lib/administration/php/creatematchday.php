<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$data = json_decode($json, true);

	//$response = [];


	$query = "
		SELECT mdnumber
		FROM matchdays
		WHERE tid = :tid
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $data["tid"]);
	$sql->execute();
	$result = $sql->fetchAll(PDO::FETCH_ASSOC);

	if($sql->rowCount() == 0){
		//currently no matchdays are existing
		$nextmatchday = 1;
		
		$response["result"] = 0;

	}else{
		//matchdays are existing

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
		
		$nextmatchday = $result[0]["MAX(mdnumber)"] + 1;

	}

	$query = "
		INSERT INTO matchdays (tid, mdnumber)
		VALUES (:tid, :mdnumber)
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $data["tid"]);
	$sql->bindParam(":mdnumber", $nextmatchday);
	$sql->execute();

	$response["result"] = 0;
	
	echo(json_encode($response));
?>