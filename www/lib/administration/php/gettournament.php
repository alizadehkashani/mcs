<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$data = json_decode($json, true);


	$sql = $dbconnection->prepare("SELECT * FROM tournaments WHERE tid = :tid");
	$sql->bindParam(":tid", $data["tournmanetid"]);
	$sql->execute();
	$result = $sql->fetchAll(PDO::FETCH_ASSOC);

	echo(json_encode($result));
	
?>