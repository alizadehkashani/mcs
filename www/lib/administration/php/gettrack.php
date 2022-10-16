<?php
	//get db information
	require("../../../../lib/dbconfig.php");
	
	$data = file_get_contents("php://input");
	$input = json_decode($data, true);

	$response = [];

	//query to get track
	$query = "
		SELECT *
		FROM tracks
		WHERE tid = :tid AND trackid = :trackid
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":trackid", $input["trackid"]);
	$sql->execute();
	$track = $sql->fetch(PDO::FETCH_ASSOC);


	echo(json_encode($track));
?>