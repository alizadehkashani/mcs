<?php
	require('../validatelogin.php');
	include('../dbconfig.php');

	//delete current data
	$sql = $dbconnection->prepare("TRUNCATE TABLE groups");
	$sql->execute();
	
	//file path to csv file
	$filepath = "../../dev/startgroup.csv";
	
	//open csv file
	$csv = file($filepath);

	//number of entries in file
	$entries = count($csv);
	
	//init array for data of csv file
	$data = [];

	//fill array with data from csv
	for($i = 0; $i < $entries; $i++){
		$data[$i] = explode(";", $csv[$i]);
	}	
	
	//insert data from csv file into database
	for($i = 1; $i < count($csv); $i++){
		$sql = $dbconnection->prepare("INSERT INTO groups (track, startgroup, player, surname, firstname) VALUES (:track, :startgroup, :player, :surname, :firstname)");
		$sql->bindParam(":track", $data[$i][0]);
		$sql->bindParam(":startgroup", $data[$i][1]);
		$sql->bindParam(":player", $data[$i][2]);
		$sql->bindParam(":surname", $data[$i][3]);
		$sql->bindParam(":firstname", $data[$i][4]);
		$sql->execute();
	}
?>