<?php
	//get db information
	require("../../../../lib/dbconfig.php");
	
	$data = file_get_contents("php://input");
	$input = json_decode($data, true);

	$response = [];

	$query = "
		SELECT *
		FROM players
		WHERE playernumber = :playernumber 
	";

	$sql = $dbconnection->prepare($query);
	$sql->bindParam(":playernumber", $input["playernumber"]);
	$sql->execute();
	$player = $sql->fetch(PDO::FETCH_ASSOC);
	
	if($sql->rowCount() > 0){

		echo(json_encode($player));

	}else{
		echo("0");
	}

?>
