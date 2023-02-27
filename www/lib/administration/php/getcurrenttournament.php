<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$data = json_decode($json, true);

	$one = 1;

	$query = "SELECT * FROM tournaments WHERE tcurrent = :one";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":one", $one);
	$sql->execute();
	$result = $sql->fetch(PDO::FETCH_ASSOC);

	echo(json_encode($result));

?>
