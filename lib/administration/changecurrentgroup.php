<?php

	//require('../validatelogin.php');	
	include('../dbconfig.php');

	//set sign for sql query
	if($_POST["sign"] == "plus"){
		$sign = "+";
	}elseif($_POST["sign"] == "minus"){
		$sign = "-";
	}

	//array for php reply
	$reply = [];
	
	//get current group value
	$sqlquery = "
	SELECT currentgroup
	FROM tracks
	WHERE track = :track
	";
	
	$sql = $dbconnection->prepare($sqlquery);
	$sql->bindParam(":track", $_POST["track"]);
	$sql->execute();
	$currentgroup = $sql->fetch(PDO::FETCH_ASSOC);

	//get last group of track	
	$sqlquery = "
	SELECT MAX(startorder)
	FROM groups
	WHERE track = :track
	";

	$sql = $dbconnection->prepare($sqlquery);
	$sql->bindParam(":track", $_POST["track"]);
	$sql->execute();
	$maxgroup = $sql->fetch(PDO::FETCH_ASSOC);


	//prevent user from going out of bound
	//if already on first startorder and want to reduce
	if($currentgroup["currentgroup"] == 1 && $sign == "-"){
		$reply['status'] = 1;
		$reply['message'] = "Current Startgroup is first Startgroup";
		$reply['sign'] = $sign;
	
	//if already on last group and want to increase
	}elseif($currentgroup["currentgroup"] == $maxgroup["MAX(startorder)"] && $sign == "+"){
		$reply['status'] = 1;
		$reply['message'] = "Current Startgroup is last Startgroup";
		$reply['sign'] = $sign;
	
	//set new group if change would not go out of bound
	}else{
		$sqlquery = "
		UPDATE tracks 
		SET currentgroup = currentgroup" . $sign . "1
		WHERE track = :track
		";
		
		$sql = $dbconnection->prepare($sqlquery);
		$sql->bindParam(":track", $_POST["track"]);
		$sql->execute();

		$reply['status'] = 0;
		$reply['message'] = "Startgroup changed";
		$reply['sign'] = $sign;
	}

	echo(json_encode($reply));

?>