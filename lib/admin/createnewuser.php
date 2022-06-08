<?php

	include('../dbconfig.php');
	//include('validatelogin.php');

	var_dump($_POST);

	$hashedpassword = password_hash($_POST["userpassword"], PASSWORD_DEFAULT);

	var_dump($hashedpassword);

	$sql = $dbconnection->prepare("INSERT INTO user (username, userpassword) VALUES (:username, :userpassword)");
	$sql->bindParam(':username', $_POST["username"]);
	$sql->bindParam(':userpassword', $hashedpassword);
	$sql->execute();
?>