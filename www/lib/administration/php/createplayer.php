<?php
	//get db information
	require("../../../../lib/dbconfig.php");
	
	$data = file_get_contents("php://input");
	$input = json_decode($data, true);

	//array for response
	$response = [];

	//query to check if player with that number is already existing
	$query = "
		SELECT playernumber
		FROM players
		WHERE tid = :tid AND playernumber = :playernumber
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":playernumber", $input["playernumber"]);
	$sql->execute();

	//store amount of players with same number
	$numberofplayers = $sql->rowCount();
	
	//if players fround with that number
	if($numberofplayers != 0){
		//exit script
		$response["result"] = 1;
		$response["message"] = "Spielernummer bereits vergeben";
	}else{
	
		//query to insert new player 
		$query = "
			INSERT INTO players (tid, cid, playernumber, gender, surname, firstname)
			VALUES (:tid, :cid, :playernumber, :gender, :surname, :firstname)
		";

		$sql = $dbconnection->prepare($query);
		$sql->bindParam(":tid", $input["tid"]);
		$sql->bindParam(":cid", $input["cid"]);
		$sql->bindParam(":playernumber", $input["playernumber"]);
		$sql->bindParam(":gender", $input["gender"]);
		$sql->bindParam(":surname", $input["tid"]);
		$sql->bindParam(":firstname", $input["firstname"]);
		$sql->execute();

		$response["result"] = 0;

	}

	echo(json_encode($response));
?>