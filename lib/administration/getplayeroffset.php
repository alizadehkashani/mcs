<?php

	//require('../validatelogin.php');	
	include('../dbconfig.php');

	
	if($_POST['offset'] == 0){
		
		$sqlquery = 
		"
			SELECT groups.startorder, groups.startgroup, players.playernumber, players.surname, players.firstname, clubs.name
			FROM players 
			JOIN groups
			ON players.playernumber = groups.player
			JOIN tracks
			ON tracks.currentgroup = groups.startorder 
			AND tracks.track = groups.track
			JOIN clubs
			ON players.club = clubs.id
			WHERE tracks.track = :trackid
			AND tracks.currentgroup = groups.startorder
			ORDER BY playerorder ASC;
		";

		$sql = $dbconnection->prepare($sqlquery);
		$sql->bindParam(":trackid", $_POST['track']);
		$sql->execute();
		$result = $sql->fetchAll();

		echo(json_encode($result));
	}else{

		$sqlquery = "
			SELECT currentgroup
			FROM tracks
			WHERE track = :trackid
		";
	
		$sql = $dbconnection->prepare($sqlquery);
		$sql->bindParam(":trackid", $_POST['track']);
		$sql->execute();
		$currentgroup = $sql->fetch(PDO::FETCH_ASSOC);
				
		$offsetgroup = $currentgroup['currentgroup'] + $_POST['offset'];
		
		$sqlquery = 
		"
			SELECT groups.startgroup, players.playernumber, players.surname, players.firstname, clubs.name
			FROM players 
			JOIN groups
			ON players.playernumber = groups.player
			JOIN clubs
			ON players.club = clubs.id
			WHERE groups.track = :trackid
			AND groups.startorder = :offsetgroup
			ORDER BY playerorder ASC;
		";

		$sql = $dbconnection->prepare($sqlquery);
		$sql->bindParam(":trackid", $_POST['track']);
		$sql->bindParam(":offsetgroup", $offsetgroup);
		$sql->execute();
		$result = $sql->fetchAll();

		echo(json_encode($result));


	}

?>