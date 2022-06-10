<?php
	require('../validatelogin.php');
	include('../dbconfig.php');

	$reply = [];

	//check if user with that name is available
	$sql = $dbconnection->prepare("SELECT COUNT(username) FROM user WHERE username = :username");
	$sql->bindParam(':username', $_POST["username"]);
	$sql->execute();
	$result = $sql->fetch(PDO::FETCH_NUM);
	
	//if no user with that name exists
	if($result[0] == 0){
		$reply['result'] = 1;
		$reply['message'] = "User does not exist";
	}else if($result[0] == 1){
		//if user with name exist, delete user
		$sql = $dbconnection->prepare("DELETE FROM user WHERE username = :username");
		$sql->bindParam(':username', $_POST["username"]);
		$sql->execute();

		$reply['result'] = 0;
		$reply['message'] = "User deleted";

	}else{
		//if more than one user exist, database error
		$reply['result'] = 1;
		$reply['message'] = "Database error";
	}

	echo(json_encode($reply));

?>