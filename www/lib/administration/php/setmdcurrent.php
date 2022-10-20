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

	//set currently active md not current
	$query = "
		UPDATE matchdays
		SET mdcurrent = :zero 
		WHERE tid = :tid AND mdcurrent = :one
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":zero", $zero);
	$sql->bindParam(":one", $one);
	$sql->execute();
	
	//set new md current	
	$query = "
		UPDATE matchdays
		SET mdcurrent = :mdcurrent 
		WHERE tid = :tid AND mdnumber = :mdnumber 
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":mdnumber", $input["mdnumber"]);
	$sql->bindParam(":mdcurrent", $input["mdcurrent"]);
	$sql->execute();
	
	$response["result"] = 0;
	$response["message"] = "Spieltag aktiv";

	echo(json_encode($response));

?>
