<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$data = json_decode($json, true);

	$sql = $dbconnection->prepare("
		SELECT * FROM groups 
		WHERE tid = :tid 
		AND trackid = :trackid
		AND mdnumber = :mdnumber 
		AND rnumber = :rnumber
		ORDER BY grouporder ASC"
	);
	$sql->bindParam(":tid", $data["tid"]);
	$sql->bindParam(":trackid", $data["trackid"]);
	$sql->bindParam(":mdnumber", $data["mdnumber"]);
	$sql->bindParam(":rnumber", $data["rnumber"]);
	$sql->execute();
	$result = $sql->fetchAll(PDO::FETCH_ASSOC);

	echo(json_encode($result));

?>

