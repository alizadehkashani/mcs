<?php
	//get db information
	require("../../../../lib/dbconfig.php");
	
	$data = file_get_contents("php://input");
	$input = json_decode($data, true);

	$zero = 0;
	$one = 1;
	
	//array for response
	$response = [];

	//set currently active round not current
	$query = "
		UPDATE rounds
		SET rcurrent = :zero 
		WHERE tid = :tid AND mdnumber = :mdnumber AND rcurrent = :one
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":mdnumber", $input["mdnumber"]);
	$sql->bindParam(":zero", $zero);
	$sql->bindParam(":one", $one);
	$sql->execute();
	
	//set new round current	
	$query = "
		UPDATE rounds
		SET rcurrent = :rcurrent 
		WHERE tid = :tid AND mdnumber = :mdnumber AND rnumber = :rnumber
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":mdnumber", $input["mdnumber"]);
	$sql->bindParam(":rnumber", $input["rnumber"]);
	$sql->bindParam(":rcurrent", $input["rcurrent"]);
	$sql->execute();
	
	$response["result"] = 0;
	$response["message"] = "Runde aktiv";

	echo(json_encode($response));

?>

