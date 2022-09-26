<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$data = json_decode($json, true);
	
	$sql = $dbconnection->prepare("SELECT * FROM clubs WHERE tid = :tid AND cid = :cid");
	$sql->bindParam(":tid", $data["tid"]);
	$sql->bindParam(":cid", $data["cid"]);
	$sql->execute();
	$result = $sql->fetchAll(PDO::FETCH_ASSOC);

	echo(json_encode($result));

?>