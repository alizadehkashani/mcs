<?php
	//get db information
	require("../../../../lib/dbconfig.php");
	
	$data = file_get_contents("php://input");
	$input = json_decode($data, true);

	//array for response
	$response = [];

	$query = "DELETE FROM groupplayers
		WHERE groupid = :groupid
		AND playernumber = :playernumber";
	
	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":groupid", $input["groupid"]);
	$sql->bindParam(":playernumber", $input["playernumber"]);
	$sql->execute();

	$response["result"] = 0;
	$response["message"] = "player removed from group"; 

	echo(json_encode($response));
?>

