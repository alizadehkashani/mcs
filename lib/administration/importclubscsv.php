<?php
	//require('../validatelogin.php');
	
	include('../dbconfig.php');

	//delete current data
	$sql = $dbconnection->prepare("TRUNCATE TABLE clubs");
	$sql->execute();
	

	//file path to csv file
	$filepath = "../../dev/clubs.csv";
	
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
		INSERT INTO clubs (id, startorder, category, resultclub, name)
		VALUES (:id, :startorder, :category, :resultclub, :name)
	";

	$queryupdate = "
		UPDATE clubs
		SET startorder = :startorder, category = :category, resultclub = :resultclub, name = :name
		WHERE id = :id;
	";

	//insert data from csv file into database
	for($i = 1; $i < $entries; $i++){
		try{
			$sql = $dbconnection->prepare($queryinsert);
			$sql->bindParam(":id", $data[$i][0]);
			$sql->bindParam(":startorder", $data[$i][1]);
			$sql->bindParam(":category", $data[$i][2]);
			$sql->bindParam(":resultclub", $data[$i][3]);
			$sql->bindParam(":name", $data[$i][4]);
			$sql->execute();

		}catch(PDOException $error){
						
			$errorcode =  $error->getCode();
			$errormessage = $error->getMessage();
			
			echo($errorcode);
			echo($errormessage);

			if($errorcode == 23000){

				$sql = $dbconnection->prepare($queryupdate);
				$sql->bindParam(":id", $data[$i][0]);
				$sql->bindParam(":startorder", $data[$i][1]);
				$sql->bindParam(":category", $data[$i][2]);
				$sql->bindParam(":resultclub", $data[$i][3]);
				$sql->bindParam(":name", $data[$i][4]);
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