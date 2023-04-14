<?php
	ini_set('display_errors', 1);
	error_reporting(E_ALL);

	//get db information
	require("../../../../lib/dbconfig.php");
	
	$data = file_get_contents("php://input");
	$input = json_decode($data, true);
	
	//array for response
	$response = [];

	//set currently active md not current
	$query = "
		UPDATE matchdays
		SET mdcurrent = :zero 
		WHERE tid = :tid AND mdcurrent = :one
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindValue(":zero", 0);
	$sql->bindValue(":one", 1);
	$sql->execute();
	
	//set all rounds not current
	$query = "
		UPDATE rounds
		SET rcurrent = :zero 
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindValue(":zero", 0);
	$sql->execute();
	
	//set new md current	
	$query = "
		UPDATE matchdays
		SET mdcurrent = :mdcurrent 
		WHERE tid = :tid AND mid = :mid 
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":mid", $input["mid"]);
	$sql->bindValue(":mdcurrent", 1);
	$sql->execute();
	
	$response["result"] = 0;
	$response["message"] = "Spieltag aktiv";

	echo(json_encode($response));

?>
