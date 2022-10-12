<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$input = json_decode($json, true);

	$query = "
		SELECT *
		FROM matchdays
		WHERE tid = :tid AND mdnumber = :mdnumber
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":mdnumber", $input["mdnumber"]);
	$sql->execute();
	$result = $sql->fetch(PDO::FETCH_ASSOC);

	echo(json_encode($result));

?>