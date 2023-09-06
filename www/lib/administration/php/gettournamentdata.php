<?php
	require("../../../../lib/dbconfig.php");

	$json = file_get_contents("php://input");
	$data = json_decode($json, true);

	//$tournamentdata = [];

	if(empty($data["tid"])){
/*
		$sql = $dbconnection->prepare("
			SELECT * FROM tournaments
			WHERE tactive = :one
		");
*/
		$sql = $dbconnection->prepare("
			SELECT tournaments.tid, matchdays.mid, rounds.rid 
			FROM tournaments
			JOIN matchdays ON tournaments.tid = matchdays.tid
			LEFT JOIN rounds ON matchdays.mid = rounds.mid
			WHERE tournaments.tactive = :one
		");
		$sql->bindValue(":one", 1);
		$sql->execute();
		$result = $sql->fetchAll(PDO::FETCH_ASSOC);
	}else{

		$sql = $dbconnection->prepare("
			SELECT * FROM tournaments
			WHERE tid = :tid
		");
		$sql->bindParam(":tid", $data["tid"]);
		$sql->execute();
		$result = $sql->fetch(PDO::FETCH_ASSOC);

	}


	//$tournamentdata["tdata"] = $result;	

/*
	$sql = $dbconnection->prepare("
		SELECT * FROM matchdays
		WHERE tid = :tid
	");
	$sql->bindParam(":tid", $tournamentdata["tdata"]["tid"]);
	$sql->execute();
	$result = $sql->fetch(PDO::FETCH_ASSOC);

	$tournamentdata["tdata"]["matchdays"] = $result;
*/

	echo(json_encode($result));
?>
