<?php
	//get db information
	require("../../../../lib/dbconfig.php");
	
	$data = file_get_contents("php://input");
	$input = json_decode($data, true);

	//array for response
	$response = [];

	
	//query to insert new player 
	$query = "
	INSERT INTO playersintournament (tid, playernumber)
	VALUES (:tid, :playernumber)
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":playernumber", $input["playernumber"]);
	$sql->execute();

	$response["result"] = 0;


	echo(json_encode($response));
?>

