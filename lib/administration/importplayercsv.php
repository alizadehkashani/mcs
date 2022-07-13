<?php
	//require('../validatelogin.php');
	
	include('../dbconfig.php');

	$sql = $dbconnection->prepare("TRUNCATE TABLE players");
	$sql->execute();

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
		INSERT INTO players (playernumber, gender, surname, firstname, club, comptype, playerorderteam, startgroupsingle, playerordersingle, resultsingle)
		VALUES (:playernumber, :gender, :surname, :firstname, :club, :comptype, :playerorderteam, :startgroupsingle, :playerordersingle, :resultsingle)
	";

	//insert data from csv file into database
	for($i = 1; $i < count($csv); $i++){
		$sql = $dbconnection->prepare($queryinsert);
		$sql->bindParam(":playernumber", $data[$i][0]);
		$sql->bindParam(":gender", $data[$i][1]);
		$sql->bindParam(":surname", $data[$i][2]);
		$sql->bindParam(":firstname", $data[$i][3]);
		$sql->bindParam(":club", $data[$i][4]);		
		$sql->bindParam(":comptype", $data[$i][5]);		
		$sql->bindParam(":playerorderteam", $data[$i][6]);
		$sql->bindParam(":startgroupsingle", $data[$i][7]);
		$sql->bindParam(":playerordersingle", $data[$i][8]);
		$sql->bindParam(":resultsingle", $data[$i][9]);

		$sql->execute();

	}

	
	$reply['entries'] = $entries - 1;

	echo(json_encode($reply));

?>