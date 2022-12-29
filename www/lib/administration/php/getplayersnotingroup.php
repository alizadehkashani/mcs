<?php
	//get db information
	require("../../../../lib/dbconfig.php");
	
	$data = file_get_contents("php://input");
	$input = json_decode($data, true);

	$response = [];

	$query = "
	SELECT playernumber, surname, firstname FROM players 
	WHERE tid = :tid
	AND playernumber NOT IN(
		SELECT groupplayers.playernumber
		FROM groups
		INNER JOIN groupplayers 
		ON groupplayers.groupid = groups.groupid
		WHERE groups.tid = :tid
		AND groups.trackid = :trackid
		AND groups.mdnumber = :mdnumber
		AND groups.rnumber = :rnumber)
		ORDER BY playernumber ASC
		";


	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":trackid", $input["trackid"]);
	$sql->bindParam(":mdnumber", $input["mdnumber"]);
	$sql->bindParam(":rnumber", $input["rnumber"]);
	$sql->execute();
	$players = $sql->fetchAll();

	echo(json_encode($players));
?>
