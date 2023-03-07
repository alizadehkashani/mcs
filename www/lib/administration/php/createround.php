<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$data = json_decode($json, true);

	//empty array for php response
	$response = [];

	//check if there are already rounds existing
	$query = "
		SELECT rnumber 
		FROM rounds 
		WHERE tid = :tid AND mid = :mid
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $data["tid"]);
	$sql->bindParam(":mid", $data["mid"]);
	$sql->execute();
	$result = $sql->fetchAll(PDO::FETCH_ASSOC);
	
	$numberofrounds = $sql->rowCount();

	if($numberofrounds == 0){//currently no rounds are existing
		//if there are no rounds, set rounds to one
		$nextround = 1;

		//set response message
		$response["message"] = "first round for matchday";
		
	}else{//rounds are existing

		//get max round 
		$query = "
		SELECT MAX(rnumber)
		FROM rounds 
		WHERE tid = :tid AND mid = :mid
		";
		
		$sql = $dbconnection->prepare($query);
		$sql->bindParam(":tid", $data["tid"]);
		$sql->bindParam(":mid", $data["mid"]);
		$sql->execute();
		$result = $sql->fetchAll(PDO::FETCH_ASSOC);
		
		//set round to current round plus one
		$nextround = $result[0]["MAX(rnumber)"] + 1;
		
		$response["message"] = "additional round created";

	}

	//insert new round 
	$query = "
		INSERT INTO rounds (tid, mid, rnumber)
		VALUES (:tid, :mid, :rnumber)
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $data["tid"]);
	$sql->bindParam(":mid", $data["mid"]);
	$sql->bindParam(":rnumber", $nextround);
	$sql->execute();

	$newrid = $dbconnection->lastInsertId();

	$response["result"] = 0;
	$response["rid"] = $newrid;
	$response["rnumber"] = $nextround;
	$response["numberofrounds"] = $numberofrounds;
	
	echo(json_encode($response));
?>
