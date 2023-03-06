<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$input = json_decode($json, true);

	$sql = $dbconnection->prepare("
		SELECT * FROM rounds 
		WHERE tid = :tid 
		AND mid = :mid 
		AND rid = :rid
	");

	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":mid", $input["mid"]);
	$sql->bindParam(":rid", $input["rid"]);
	$sql->execute();
	$result = $sql->fetch(PDO::FETCH_ASSOC);

	echo(json_encode($result));

?>
