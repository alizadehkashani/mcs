<?php

	include('../dbconfig.php');
	//include('validatelogin.php');

	

	$hashedpassword = password_hash($_POST["userpassword"], PASSWORD_DEFAULT);

	$reply = [];


	try{
		$sql = $dbconnection->prepare("INSERT INTO user (username, userpassword) VALUES (:username, :userpassword)");
		$sql->bindParam(':username', $_POST["username"]);
		$sql->bindParam(':userpassword', $hashedpassword);
		$sql->execute();

		$reply['result'] = 0;
		$reply['message'] = "User created";

	}catch(PDOException $error){
		
		$errorcode =  $error->getCode();
		
		$reply['result'] = 1;

		if($errorcode = "23000"){
			$reply['message'] = "User already exists";
		}

	}

	echo(json_encode($reply));
?>