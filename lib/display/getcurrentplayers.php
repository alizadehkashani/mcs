<?php

	//require('../validatelogin.php');	
	include('../dbconfig.php');


	$sqlquery = 
	"
	SELECT groups.track, groups.startgroup, groups.player, groups.surname, groups.firstname 
	FROM groups 
	JOIN tracks 
	ON tracks.currentgroup = groups.startgroup AND tracks.track = groups.track
	WHERE tracks.track = :trackid
	ORDER BY groups.player ASC;
	";

	$sql = $dbconnection->prepare($sqlquery);
	$sql->bindParam(":trackid", $_POST['track']);
	$sql->execute();
	$result = $sql->fetchAll();

	echo(json_encode($result));

?>