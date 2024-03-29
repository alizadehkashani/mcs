<?php
	//get db information
	require("../../../../lib/dbconfig.php");
	
	$data = file_get_contents("php://input");
	$input = json_decode($data, true);
		
	//array for response
	$response = [];

	//update track
	$query = "
		UPDATE tracks
		SET label = :label, trackdescription = :trackdescription
		WHERE tid = :tid AND trackid = :trackid
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":trackid", $input["trackid"]);
	$sql->bindParam(":label", $input["label"]);
	$sql->bindParam(":trackdescription", $input["trackdescription"]);
	$sql->execute();

	$response["result"] = 0;
	$response["message"] = "Bahn aktualisiert";

	echo(json_encode($response));

?>