<?php
	ini_set('display_errors', 1);
	error_reporting(E_ALL);

	//get db information
	require("../../../../lib/dbconfig.php");
	
	$data = file_get_contents("php://input");
	$input = json_decode($data, true);

	$zero = 0;
	$one = 1;
	
	//array for response
	$response = [];

	//set currently active tournament not current
	$query = "
		UPDATE tournaments
		SET tcurrent = :zero 
		WHERE tcurrent = :one
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":zero", $zero);
	$sql->bindParam(":one", $one);
	$sql->execute();

	//set all matchdays not current
	$query = "
		UPDATE matchdays
		SET mdcurrent = :zero 
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindValue(":zero", 0);
	$sql->execute();
	
	//set all rounds not current
	$query = "
		UPDATE rounds
		SET rcurrent = :zero 
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindValue(":zero", 0);
	$sql->execute();
	
	//set new tournament current	
	$query = "
		UPDATE tournaments
		SET tcurrent = :one 
		WHERE tid = :tid 
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":one", $one);
	$sql->execute();
	
	$response["result"] = 0;
	$response["message"] = "Turnier aktiv";

	echo(json_encode($response));

?>

