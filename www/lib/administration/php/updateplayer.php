<?php
	//get db information
	require("../../../../lib/dbconfig.php");
	
	$data = file_get_contents("php://input");
	$input = json_decode($data, true);

	//array for response
	$response = [];

	//query to check if player with that number is already existing
	$query = "
		UPDATE players
		SET cid = :cid, gender = :gender, surname = :surname, firstname = :firstname
		WHERE playernumber = :playernumber
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":cid", $input["cid"]);
	$sql->bindParam(":playernumber", $input["playernumber"]);
	$sql->bindParam(":gender", $input["gender"]);
	$sql->bindParam(":surname", $input["surname"]);
	$sql->bindParam(":firstname", $input["firstname"]);
	$sql->execute();
	
	$response["result"] = 0;
	$response["message"] = "Spieler wurde aktualisiert";

	echo(json_encode($response));

?>
