<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$input = json_decode($json, true);

	$response = [];

	//groupplayers
	//groups
	//rounds
	//matchdays
	//playersintournament
	//tracks
	//tournaments

	//start new db transaction
	$dbconnection->beginTransaction();

	//delete groupplayers
	$query = "
		DELETE FROM groupplayers
		WHERE tid = :tid 
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->execute();

	//delete groups
	$query = "
		DELETE FROM groups
		WHERE tid = :tid 
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->execute();
	
	//delete rounds
	$query = "
		DELETE FROM rounds
		WHERE tid = :tid 
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->execute();

	//delete matchdays
	$query = "
		DELETE FROM matchdays
		WHERE tid = :tid 
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->execute();

	//delete playersintournament
	$query = "
		DELETE FROM playersintournament
		WHERE tid = :tid 
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->execute();

	//delete tracks
	$query = "
		DELETE FROM tracks
		WHERE tid = :tid 
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->execute();

	//delete tournaments
	$query = "
		DELETE FROM tournaments
		WHERE tid = :tid 
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->execute();

	//commit
	$commit = $dbconnection->commit();

	if($commit == true){
		$response["result"] = 0;
		$response["message"] = "Turnier geloescht";
	}

	echo(json_encode($response));

?>

