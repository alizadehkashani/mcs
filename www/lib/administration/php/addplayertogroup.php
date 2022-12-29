<?php
	//get db information
	require("../../../../lib/dbconfig.php");
	
	$data = file_get_contents("php://input");
	$input = json_decode($data, true);

	//array for response
	$response = [];


	//check if player is already in group
	$query = "SELECT * FROM groupplayers 
		WHERE tid = :tid 
		AND groupid = :groupid 
		AND playernumber = :playernumber";
	
	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":groupid", $input["groupid"]);
	$sql->bindParam(":playernumber", $input["playernumber"]);
	$sql->execute();

	//if player is already in group exit
	if($sql->rowCount() != 0){
		$response["message"] = "player is already in group";
		echo(json_encode($response));
		exit();
	}

	//if player is not in group yet
	//check if there are already any players in group to set the order
	$query = "SELECT * FROM groupplayers 
		WHERE tid = :tid 
		AND groupid = :groupid 
		";
	
	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":groupid", $input["groupid"]);
	$sql->execute();

	if($sql->rowCount() == 0){//currently no players in group
		//if there are no players, set playerorder to one
		$playerorder = 1;

		//set response message
		$response["message"] = "no players in group yet";

	}else{//groups are existing

		//get max group 
		$query = "
				SELECT MAX(playerorder)
				FROM groupplayers 
				WHERE tid = :tid 
				AND groupid = :groupid
				";

		$sql = $dbconnection->prepare($query);
		$sql->bindParam(":tid", $input["tid"]);
		$sql->bindParam(":groupid", $input["groupid"]);
		$sql->execute();
		$result = $sql->fetchAll(PDO::FETCH_ASSOC);

		//set player order
		$playerorder = $result[0]["MAX(playerorder)"] + 1;

		$response["message"] = "groups already exsiting";

	}


	//insert player
	$query = "
		INSERT INTO groupplayers (tid, groupid, playernumber, playerorder)
		VALUES (:tid, :groupid, :playernumber, :playerorder)
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":groupid", $input["groupid"]);
	$sql->bindParam(":playernumber", $input["playernumber"]);
	$sql->bindParam(":playerorder", $playerorder); 
	$sql->execute();

	$response["result"] = 0;
	$response["grouporder"] = $playerorder;

	echo(json_encode($response));
?>
