<?php
	//get db information
	require("../../../../lib/dbconfig.php");
	
	$data = file_get_contents("php://input");
	$input = json_decode($data, true);

	$response = [];

	//check what players should be returned
	if($input["all"] == 1){

		$query = "
			SELECT *
			FROM players
			WHERE tid = :tid 
		";

	}else{

		$query = "
			SELECT *
			FROM players
			WHERE tid = :tid AND cid = :cid
		";

	}

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":trackid", $input["trackid"]);
	$sql->execute();
	$track = $sql->fetch(PDO::FETCH_ASSOC);

	echo(json_encode($track));
?>
