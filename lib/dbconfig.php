<?php
	include('config.php');
	
	$servername = $config['servername'];
	$dbname = $config['dbname'];
	$username = $config['username'];
	$password = $config['password'];

	try{
		//try conencting to db
		$dbconnection = new PDO("mysql:host=$servername; dbname=$dbname; charset=utf8", $username, $password);
		$dbconnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 

	}catch(PDOException $error){
		echo $error->getMessage();	
		echo "Connection to DB failed";
	}
?>
