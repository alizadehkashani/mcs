<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$data = json_decode($json, true);

	$sql = $dbconnection->prepare("SELECT * FROM matchdays WHERE tid = :tid ORDER BY mdnumber ASC");
	$sql->bindParam(":tid", $data["tid"]);
	$sql->execute();
	$result = $sql->fetchAll(PDO::FETCH_ASSOC);

	echo(json_encode($result));

?>