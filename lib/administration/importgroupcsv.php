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

	//array for result reply
	$reply = [];

	$reply['status'] = 0;

	$query = "
		INSERT INTO groups (startorder, track, startgroup, player)
		VALUES (:startorder, :track, :startgroup, :player)
	";
	
	//insert data from csv file into database
	for($i = 1; $i < count($csv); $i++){
		try{

			$sql = $dbconnection->prepare($query);
			$sql->bindParam(":startorder", $data[$i][0]);
			$sql->bindParam(":track", $data[$i][1]);
			$sql->bindParam(":startgroup", $data[$i][2]);
			$sql->bindParam(":player", $data[$i][3]);
			$sql->execute();			

		}catch(PDOException $error){
			$errorcode =  $error->getCode();
			$errormessage = $error->getMessage();

			$reply['status'] = 1;
			
			$reply['errorcode'] = $errorcode;
			$reply['errormessage'] = $errormessage; 
			
		}
	}
		

	$reply['entries'] = $entries - 1;

	echo(json_encode($reply));

?>