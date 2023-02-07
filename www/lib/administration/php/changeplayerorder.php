<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$data = json_decode($json, true);

	$response = [];

//	echo($data["playerorder"]);

	if($data["direction"] == 1){
		$operand = "<";
	}else{
		$operand = ">";
	}

	$query = "SELECT * FROM groupplayers
		WHERE groupid = :groupid
		AND playerorder" . $operand . ":playerorder
		ORDER BY playerorder DESC
		LIMIT 1
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":groupid", $data["groupid"]);
	$sql->bindParam(":playerorder", $data["playerorder"]);
	$sql->execute();
	$result = $sql->fetch(PDO::FETCH_ASSOC);
	
	//echo(json_encode($response));
	echo(json_encode($result));

?>
