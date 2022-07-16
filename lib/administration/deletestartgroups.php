<?php

	//require('../validatelogin.php');	
	include('../dbconfig.php');

	//clear stratgroups table
	$sql = $dbconnection->prepare("TRUNCATE TABLE groups");
	$sql->execute();

	//clear indvgroups table
	$sql = $dbconnection->prepare("TRUNCATE TABLE indvgroups");
	$sql->execute();
	

	echo(json_encode("deleted"));

?>