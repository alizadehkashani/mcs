<?php

	include('../dbconfig.php');

	var_dump($_POST);

	echo("hi");

	$username = $_POST["username"];
	$userpassword = $_POST["userpassword"];

	echo($username);
	echo($userpassword);
?>