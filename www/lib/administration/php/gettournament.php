<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$data = json_decode($json, true);


	$sql = $dbconnection->prepare("SELECT * FROM tournaments WHERE id = :id");
	$sql->bindParam(":id", $data["tournmanetid"]);
	$sql->execute();
	$result = $sql->fetchAll(PDO::FETCH_ASSOC);

	echo(json_encode($result));
	
?>