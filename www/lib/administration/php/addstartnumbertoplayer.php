<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$input = json_decode($json, true);

	$response = [];

	//TODO check if startnumber was already assigned to another player in the tournament
	$query = "
		SELECT playernumber 
		FROM playersintournament
		WHERE tid = :tid 
		AND startnumber = :startnumber
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":startnumber", $input["startnumber"]);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->execute();
	$result = $sql->fetch(PDO::FETCH_ASSOC);
	
	if($sql->rowCount() != 0){
		$response["result"] = 1;
		$response["message"] = "Startnummber bereits vergeben";
	}else{
		//add startnumber to player
		$query = "
			UPDATE playersintournament
			SET startnumber = :startnumber
			WHERE tid = :tid 
			AND playernumber = :playernumber
		";

		$sql = $dbconnection->prepare($query);
		$sql->bindParam(":startnumber", $input["startnumber"]);
		$sql->bindParam(":tid", $input["tid"]);
		$sql->bindParam(":playernumber", $input["playernumber"]);
		$sql->execute();

		$response["result"] = 0;
		$response["message"] = "Startnummer wurde dem Spieler hinzugefuegt";
	}
	
	echo(json_encode($response));

?>

