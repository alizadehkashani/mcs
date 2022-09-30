<?php
	//get db information
	require("../../../../lib/dbconfig.php");
	
	$data = file_get_contents("php://input");
	$input = json_decode($data, true);

	$response = [];

	//query to check for number of tracks
	$query = "
		SELECT trackid
		FROM tracks
		WHERE tid = :tid
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->execute();

	$numberoftracks = $sql->rowCount();

	if($numberoftracks == 10){
		$response["result"] = 1;
		$response["message"] = "Maximal Anzahl von Anlagen ist 10";
	}else{
	
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

		$response["result"] = 0;

	}

	echo(json_encode($response));
?>