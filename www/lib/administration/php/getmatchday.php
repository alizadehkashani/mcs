<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$input = json_decode($json, true);

	$query = "
		SELECT *
		FROM matchdays
		WHERE tid = :tid AND mid = :mid
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":mid", $input["mid"]);
	$sql->execute();
	$result = $sql->fetch(PDO::FETCH_ASSOC);

	echo(json_encode($result));

?>
