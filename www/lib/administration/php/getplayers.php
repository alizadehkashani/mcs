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
			ORDER BY playernumber ASC
		";

	}

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":cid", $input["cid"]);
	$sql->execute();
	$players = $sql->fetchAll(PDO::FETCH_ASSOC);

	echo(json_encode($players));
?>
