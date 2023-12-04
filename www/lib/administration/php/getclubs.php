<?php
	require("../../../../lib/dbconfig.php");

	$sql = $dbconnection->prepare("SELECT * FROM clubs ORDER BY cname ASC");
	$sql->execute();
	$result = $sql->fetchAll(PDO::FETCH_ASSOC);

	echo(json_encode($result));

?>
