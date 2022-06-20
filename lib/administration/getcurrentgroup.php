<?php

	require('../validatelogin.php');	
	include('../dbconfig.php');


	$sqlquery = 
	"
	SELECT currentgroup FROM tracks WHERE track = :trackid
	";

	$sql = $dbconnection->prepare($sqlquery);
	$sql->bindParam(":trackid", $_POST['trackid']);
	$sql->execute();
	$result = $sql->fetch(PDO::FETCH_ASSOC);

	echo(json_encode($result));

?>