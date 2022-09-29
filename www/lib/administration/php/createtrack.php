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
		
		//update track
		$query = "
			UPDATE tracks
			SET tid = :tid, label = :label, trackdescription = :trackdescription
			WHERE trackid = :trackid
		";

		$sql = $dbconnection->prepare($query);
		$sql->bindParam(":tid", $input["tid"]);
		$sql->bindParam(":label", $input["label"]);
		$sql->bindParam(":trackdescription", $input["trackdescription"]);
		$sql->bindParam(":trackid", $input["trackid"]);
		$sql->execute();

?>