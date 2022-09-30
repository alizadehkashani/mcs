<?php
	//get db information
	require("../../../../lib/dbconfig.php");
	
	$data = file_get_contents("php://input");
	$input = json_decode($data, true);

	
	//query to insert new track 
	$query = "
		INSERT INTO tracks (tid, label, trackdescription)
		VALUES (:tid, :label, :trackdescription)
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":label", $input["label"]);
	$sql->bindParam(":trackdescription", $input["trackdescription"]);
	$sql->execute();

	$response = [];
	$response["result"] = 0;
	echo(json_encode($response));

?>