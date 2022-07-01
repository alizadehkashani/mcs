<?php
	require('../validatelogin.php');
	
	include('../dbconfig.php');


	/*
	//delete current data
	$sql = $dbconnection->prepare("TRUNCATE TABLE groups");
	$sql->execute();
	*/

	//file path to csv file
	$filepath = "../../dev/players.csv";
	
	//open csv file
	$csv = file($filepath);

	//number of entries in file
	$entries = count($csv);
	
	//init array for data of csv file
	$data = [];

	//array for reply;
	$reply = [];

	$reply['status'] = 0;

	//fill array with data from csv

	for($i = 0; $i < $entries; $i++){
		$data[$i] = explode(";", $csv[$i]);
	}

	$queryinsert = "
		INSERT INTO players (playernumber, surname, firstname, club)
		VALUES (:playernumber, :surname, :firstname, :club)
	";

	$queryupdate = "
		UPDATE players
		SET surname = :surname, firstname = :firstname, club = :club
		WHERE playernumber = :playernumber;
	";

	//insert data from csv file into database
	for($i = 1; $i < count($csv); $i++){
		try{
			$sql = $dbconnection->prepare($queryinsert);
			$sql->bindParam(":playernumber", $data[$i][0]);
			$sql->bindParam(":surname", $data[$i][1]);
			$sql->bindParam(":firstname", $data[$i][2]);
			$sql->bindParam(":club", $data[$i][3]);		
			$sql->execute();
		}catch(PDOException $error){
			

			$errorcode =  $error->getCode();
			$errormessage = $error->getMessage();

			if($errorcode = "23000"){
				$sql = $dbconnection->prepare($queryupdate);
				$sql->bindParam(":playernumber", $data[$i][0]);
				$sql->bindParam(":surname", $data[$i][1]);
				$sql->bindParam(":firstname", $data[$i][2]);
				$sql->bindParam(":club", $data[$i][3]);		
				$sql->execute();
			}else{
				$reply['status'] = 1;
				$reply['errormessage'] = $errormessage;
			}

		}
	}

	
	$reply['entries'] = $entries - 1;

	echo(json_encode($reply));

?>