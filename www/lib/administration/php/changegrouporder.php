<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$data = json_decode($json, true);

	$response = [];

	//direction in which the group should be moved
	//if direction is 0 then the group will be moved up
	//if direction is 1 then the group will be moved down
	if($data["direction"] == 0){
		$operand = ">";
		$order = "ASC";
	}else{
		$operand = "<";
		$order = "DESC";
	}

	//get the group above/below the current group
	$query = "SELECT * FROM groups
		WHERE tid = :tid
		AND trackid = :trackid
		AND mdnumber = :mdnumber
		AND rnumber = :rnumber
		AND grouporder" . $operand . ":grouporder
		ORDER BY grouporder " . $order .
		" LIMIT 1
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $data["tid"]);
	$sql->bindParam(":trackid", $data["trackid"]);
	$sql->bindParam(":mdnumber", $data["mdnumber"]);
	$sql->bindParam(":rnumber", $data["rnumber"]);
	$sql->bindParam(":grouporder", $data["grouporder"]);
	$sql->execute();
	$result = $sql->fetch(PDO::FETCH_ASSOC);

	if($sql->rowCount() > 0){//if a player is found

		$movingroupnumber = $data["groupid"];
		$movingrouporder = $data["grouporder"];

		$targetgroupid = $result["groupid"];		
		$targetgrouporder = $result["grouporder"];		

		//set currentgroup grouporder to targetgroup grouporder
		$query = "UPDATE groups 
			SET grouporder = :grouporder 
			WHERE groupid = :groupid 
			";

		$sql = $dbconnection->prepare($query);
		$sql->bindParam(":groupid", $movingroupnumber);
		$sql->bindParam(":grouporder", $targetgrouporder);
		$sql->execute();

		//set targetgroup grouporder to currentgroup grouporder
		$query = "UPDATE groups 
			SET grouporder = :grouporder 
			WHERE groupid = :groupid 
			";

		$sql = $dbconnection->prepare($query);
		$sql->bindParam(":groupid", $targetgroupid);
		$sql->bindParam(":grouporder", $movingrouporder);
		$sql->execute();

		$response["result"] = 0;
		$response["message"] = "group moved";

	}else{//if there is no group above/below
		$response["result"] = 1;
		$response["message"] = "kein gruppe gefunden";
	}
	
	//echo(json_encode($response));
	echo(json_encode($response));
?>
