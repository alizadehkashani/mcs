<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$input = json_decode($json, true);

	$sql = $dbconnection->prepare("
		SELECT * FROM rounds 
		WHERE tid = :tid 
		AND mdnumber = :mdnumber 
		AND rnumber = :rnumber
	");

	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":mdnumber", $input["mdnumber"]);
	$sql->bindParam(":rnumber", $input["rnumber"]);
	$sql->execute();
	$result = $sql->fetch(PDO::FETCH_ASSOC);

	echo(json_encode($result));

?>
