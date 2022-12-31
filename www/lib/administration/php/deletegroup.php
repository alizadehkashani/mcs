<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$input = json_decode($json, true);

	$response = [];

	//delete player group assignment
	$query = "
		DELETE FROM groupplayers
		WHERE tid = :tid 
		AND groupid = :groupid
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":groupid", $input["groupid"]);
	$sql->execute();
	
	//delete group
	$query = "
		DELETE FROM groups
		WHERE tid = :tid 
		AND trackid = :trackid
		AND mdnumber = :mdnumber
		AND rnumber = :rnumber
		AND groupid = :groupid
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":tid", $input["tid"]);
	$sql->bindParam(":trackid", $input["trackid"]);
	$sql->bindParam(":mdnumber", $input["mdnumber"]);
	$sql->bindParam(":rnumber", $input["rnumber"]);
	$sql->bindParam(":groupid", $input["groupid"]);
	$sql->execute();

	$response["result"] = 0;
	$response["message"] = "Gruppe geloescht";
	
	echo(json_encode($response));

?>

