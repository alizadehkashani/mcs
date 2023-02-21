<?php
	//get db information
	require("../../../../lib/dbconfig.php");
	
	$data = file_get_contents("php://input");
	$input = json_decode($data, true);
		
	//array for response
	$response = [];

	//delete track from track master data
	$query = "
		DELETE FROM tracks 
		WHERE tid = :tid AND trackid = :trackid
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":trackid", $input["trackid"]);
	$sql->execute();

	//delete groups and groupplayers of track
	$query = "
		DELETE groups, groupplayers
		FROM groups
		INNER JOIN groupplayers
		ON groups.groupid = groupplayers.groupid
		WHERE groups.tid = :tid AND groups.trackid = :trackid
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":trackid", $input["trackid"]);
	$sql->execute();


	$response["result"] = 0;
	$response["message"] = "Bahn entfernt";

	echo(json_encode($response));

?>
