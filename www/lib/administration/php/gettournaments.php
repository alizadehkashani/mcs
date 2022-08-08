<?php
	require("../../../../lib/dbconfig.php");

	$active = 1;

	$sql = $dbconnection->prepare("SELECT * FROM tournaments WHERE active = :active");
	$sql->bindParam(":active", $active);
	$sql->execute();
	$result = $sql->fetchAll(PDO::FETCH_ASSOC);

	echo(json_encode($result));

?>