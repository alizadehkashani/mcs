<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$data = json_decode($json, true);

	$response = [];


	//direction in which the player should be moved
	//if direction is 0 then the player will be moved up
	//if direction is 1 then the player will be moved down
	if($data["direction"] == 0){
		$operand = ">";
		$order = "ASC";
	}else{
		$operand = "<";
		$order = "DESC";
	}

	//get the player above/below the current player
	$query = "SELECT * FROM groupplayers
		WHERE groupid = :groupid
		AND playerorder" . $operand . ":playerorder
		ORDER BY playerorder " . $order .
		" LIMIT 1
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":groupid", $data["groupid"]);
	$sql->bindParam(":playerorder", $data["playerorder"]);
	$sql->execute();
	$result = $sql->fetch(PDO::FETCH_ASSOC);

	if($sql->rowCount() > 0){//if a player is found

		$movingplayernumber = $data["playernumber"];
		$movingplayerorder = $data["playerorder"];

		$targetplayernumber = $result["playernumber"];		
		$targetplayerorder = $result["playerorder"];		

		//set currentplayers playerorder to targetplayer playeroder
		$query = "UPDATE groupplayers 
			SET playerorder = :playerorder 
			WHERE playernumber = :playernumber 
			AND groupid = :groupid";

		$sql = $dbconnection->prepare($query);
		$sql->bindParam(":groupid", $data["groupid"]);
		$sql->bindParam(":playerorder", $targetplayerorder);
		$sql->bindParam(":playernumber", $movingplayernumber);
		$sql->execute();

		//set targetplayer playerorder to currentplayer playeroder
		$query = "UPDATE groupplayers 
			SET playerorder = :playerorder 
			WHERE playernumber = :playernumber 
			AND groupid = :groupid";

		$sql = $dbconnection->prepare($query);
		$sql->bindParam(":groupid", $data["groupid"]);
		$sql->bindParam(":playerorder", $movingplayerorder);
		$sql->bindParam(":playernumber", $targetplayernumber);
		$sql->execute();

		$response["result"] = 0;
		$response["message"] = "player moved";

	}else{//if there is no player above/below
		$response["result"] = 1;
		$response["message"] = "kein spieler gefunden";
	}
	
	//echo(json_encode($response));
	echo(json_encode($response));

?>
