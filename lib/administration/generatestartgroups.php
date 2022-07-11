<?php

	//require('../validatelogin.php');	
	include('../dbconfig.php');

	$sql = $dbconnection->prepare("TRUNCATE TABLE groups");
	$sql->execute();

	//echo($_POST["day"]);

	//startgroup generation for day 1
	//if($_POST["day"] == 1){
		//get all male groups and order by startorder
		$query = "
			SELECT id
			FROM clubs
			WHERE category = :category
			ORDER BY startorder ASC
		";
		
		$category = "H";

		$sql = $dbconnection->prepare($query);
		$sql->bindParam(":category", $category);
		$sql->execute();
		$clubs = $sql->fetchAll();

		//number of male groups
		$numberofclubs = count($clubs);

	//}
	
	$playersordered = [];
	
	$playerposition = 1;
	
	$noplayersfound = 0;
	$playerordercounter = 0;

	while($noplayersfound < 6){
		//echo($noplayersfound);
		$noplayersfound = 0;
		for($i = 0; $i < $numberofclubs; $i++){
			
			$query = "
				SELECT playernumber, club
				FROM players
				WHERE playerorderteam = :playerposition
				AND club = :club
			";
			
			$sql = $dbconnection->prepare($query);
			$sql->bindParam(":playerposition", $playerposition);
			$sql->bindParam(":club", $clubs[$i]["id"]);
			$sql->execute();
			$nextplayer = $sql->fetchAll(PDO::FETCH_ASSOC);
						
			if(count($nextplayer) == 0){
				$noplayersfound++;
			}else{	
				$playersordered[$playerordercounter]["playernumber"] = $nextplayer[0]["playernumber"];
				$playersordered[$playerordercounter]["club"] = $nextplayer[0]["club"];
				$playerordercounter++;
			};
			

		}
		
		$playerposition++;

		
	}
	
	//build startgroups
	//test if rest ist 4
	
	
	
	echo(json_encode($playersordered));

?>