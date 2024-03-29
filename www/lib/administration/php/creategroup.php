<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$data = json_decode($json, true);

	//empty array for php response
	$response = [];

	//check if there are already groups existing
	$query = "
		SELECT groupid 
		FROM groups 
		WHERE tid = :tid 
		AND trackid = :trackid
		AND mid = :mid
		AND rid = :rid
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $data["tid"]);
	$sql->bindParam(":trackid", $data["trackid"]);
	$sql->bindParam(":mid", $data["mid"]);
	$sql->bindParam(":rid", $data["rid"]);
	$sql->execute();

	if($sql->rowCount() == 0){//currently no groups existing
		//if there are no groups, set grouporder to one
		$grouporder = 1;

		//set response message
		$response["message"] = "no groups existing yet";
		
	}else{//groups are existing

		//get max group 
		$query = "
			SELECT MAX(grouporder)
			FROM groups 
			WHERE tid = :tid 
			AND trackid = :trackid
			AND mid = :mid
			AND rid = :rid
		";
		
		$sql = $dbconnection->prepare($query);
		$sql->bindParam(":tid", $data["tid"]);
		$sql->bindParam(":trackid", $data["trackid"]);
		$sql->bindParam(":mid", $data["mid"]);
		$sql->bindParam(":rid", $data["rid"]);
		$sql->execute();
		$result = $sql->fetchAll(PDO::FETCH_ASSOC);
		
		//set round to current round plus one
		$grouporder = $result[0]["MAX(grouporder)"] + 1;
		
		$response["message"] = "groups already exsiting";

	}

	//insert new group 
	$query = "
		INSERT INTO groups (tid, trackid, mid, rid, grouporder)
		VALUES (:tid, :trackid, :mid, :rid, :grouporder)
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $data["tid"]);
	$sql->bindParam(":trackid", $data["trackid"]);
	$sql->bindParam(":mid", $data["mid"]);
	$sql->bindParam(":rid", $data["rid"]);
	$sql->bindParam(":grouporder", $grouporder);
	$sql->execute();

	$response["result"] = 0;
	$response["grouporder"] = $grouporder;
	
	echo(json_encode($response));
?>
