<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$data = json_decode($json, true);

	$result = [];

	$one = 1;


	//get tracks of tournament
	$query = "
		SELECT trackid
		FROM tracks
		WHERE tid = :tid
		";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $data["tid"]);
	$sql->execute();
	$tracks = $sql->fetchAll(PDO::FETCH_ASSOC);
	

	for($i = 0; $i < count($tracks); $i++){

		//get first round
		$query = "
			UPDATE groups 
			SET currentgroup = :one
			WHERE tid = :tid
			AND mdnumber = :mdnumber
			AND rnumber = :rnumber 
			AND trackid = :trackid
			AND groupid =
				(SELECT groupid
					FROM groups
					WHERE tid = :tid
					AND mdnumber = :mdnumber
					AND rnumber = :rnumber 
					ORDER BY grouporder ASC
					LIMIT 1)
					
			";

		$sql = $dbconnection->prepare($query);
		$sql->bindParam(":one", $one);
		$sql->bindParam(":tid", $data["tid"]);
		$sql->bindParam(":mdnumber", $data["mdnumber"]);
		$sql->bindParam(":rnumber", $data["rnumber"]);
		$sql->bindParam(":trackid", $tracks[$i]["trackid"]);
		$sql->execute();
		$result = $sql->fetch(PDO::FETCH_ASSOC);
	}

	$result["code"] = 0;
	$result["message"] = "Runden initialisiert";

	echo(json_encode($result));


?>
