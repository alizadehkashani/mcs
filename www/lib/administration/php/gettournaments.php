<?php
	require("../../../../lib/dbconfig.php");

	$sql = $dbconnection->prepare("SELECT * FROM tournaments");
	$sql->execute();
	$result = $sql->fetchAll(PDO::FETCH_ASSOC);

	echo(json_encode($result));

?>