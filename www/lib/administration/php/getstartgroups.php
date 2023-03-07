<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$data = json_decode($json, true);

	$query = "
		SELECT * FROM groups 
		WHERE tid = :tid 
		AND trackid = :trackid
		AND mid = :mid 
		AND rid = :rid
		ORDER BY grouporder ASC";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $data["tid"]);
	$sql->bindParam(":trackid", $data["trackid"]);
	$sql->bindParam(":mid", $data["mid"]);
	$sql->bindParam(":rid", $data["rid"]);
	$sql->execute();
	$result = $sql->fetchAll(PDO::FETCH_ASSOC);

	echo(json_encode($result));

?>

