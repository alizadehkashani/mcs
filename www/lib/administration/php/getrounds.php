<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$data = json_decode($json, true);

	$sql = $dbconnection->prepare("
		SELECT * FROM rounds 
		WHERE tid = :tid AND mid = :mid 
		ORDER BY rnumber ASC"
	);
	$sql->bindParam(":tid", $data["tid"]);
	$sql->bindParam(":mid", $data["mid"]);
	$sql->execute();
	$result = $sql->fetchAll(PDO::FETCH_ASSOC);

	echo(json_encode($result));

?>
