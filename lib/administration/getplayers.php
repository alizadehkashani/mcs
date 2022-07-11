<?php

	//require('../validatelogin.php');	
	include('../dbconfig.php');


	$query = " 
		SELECT players.playernumber, players.playerorderteam, players.surname, players.firstname, clubs.name 
		FROM players
		JOIN clubs
		ON players.club = clubs.id
	";

	$sql = $dbconnection->prepare($query);
	$sql->execute();
	$result = $sql->fetchAll();

	echo(json_encode($result));

?>