<?php

	//require('../validatelogin.php');	
	include('../dbconfig.php');

	//clear stratgroups table
	$sql = $dbconnection->prepare("TRUNCATE TABLE groups");
	$sql->execute();

	//variable for startorder
	$startorder = 1;
	
	$variablenamesarrayplayers = ["playersorderedmale", "playersorderedfemale"];
	$vairablenamesclubs = ["clubsmale", "clubsfemale"];
	$variablenamescount = ["numberofclubsmale", "numberofclubsfemale"];
	$tracks = ["A", "B"];
	$categories = ["H", "D"];

	
	for($m = 0; $m < 2; $m++){

		//get all male groups and order by startorder
		$query = "
			SELECT id
			FROM clubs
			WHERE category = :category
			ORDER BY startorder ASC
		";

		$sql = $dbconnection->prepare($query);
		$sql->bindParam(":category", $categories[$m]);
		$sql->execute();
		${$vairablenamesclubs[$m]} = $sql->fetchAll();


		${$variablenamescount[$m]} = count(${$vairablenamesclubs[$m]});
	
		
		//array for storing sorted players
		${$variablenamesarrayplayers[$m]} = [];
		
	
		//position inside sorted players array
		$playerordercounter = 0;
	
		//vairable storing current player position inside club
		$playerposition = 1;
		
		//variable checking if no player was found for that position
		$noplayersfound = 0;


		//fill array with players ordered
		while($noplayersfound < ${$variablenamescount[$m]}){
			
			//reset number of players not found
			$noplayersfound = 0;
			
			//loop trough clubs a retrieve the player for current position
			for($i = 0; $i < ${$variablenamescount[$m]}; $i++){
				

				$query = "
					SELECT playernumber, club
					FROM players
					WHERE playerorderteam = :playerposition
					AND club = :club
				";
				
				$sql = $dbconnection->prepare($query);
				$sql->bindParam(":playerposition", $playerposition);
				$sql->bindParam(":club", ${$vairablenamesclubs[$m]}[$i]["id"]);
				$sql->execute();
				$nextplayer = $sql->fetchAll(PDO::FETCH_ASSOC);
				
				//if no player is found for taht position count number of player not found up by one
				if(count($nextplayer) == 0){
					$noplayersfound++;
				}else{
					//if palyer is found, add it to the array
					${$variablenamesarrayplayers[$m]}[$playerordercounter]["playernumber"] = $nextplayer[0]["playernumber"];
					${$variablenamesarrayplayers[$m]}[$playerordercounter]["club"] = $nextplayer[0]["club"];
					$playerordercounter++;
				};
				
	
			}
			
			//increase player inside club order position by one
			$playerposition++;
			
		}
		
		$startgroup = 1;
		$playerspositioned = 0;
		
		//build startgroups
		$i = 0;
		

		while($i < count(${$variablenamesarrayplayers[$m]})){
		
			
			$playerrest = count(${$variablenamesarrayplayers[$m]}) - $playerspositioned;
			
			if($playerrest == 0){
				break;
			}

			if($playerrest == 4){

				//test if rest ist 4 players
				//if yes, last two groups will contain two players each
				for($k = 0; $k < 2; $k++){

					for($j = 1; $j  < 3; $j++){
												
						$query = "
						INSERT INTO groups (startorder, track, startgroup, player)
						VALUES (:startorder, :track, :startgroup, :player)
						";
				
						$sql = $dbconnection->prepare($query);
						$sql->bindParam(":startorder", $startorder);
						$sql->bindParam(":track", $tracks[0]);
						$sql->bindParam(":startgroup", $startgroup);
						$sql->bindParam(":player", ${$variablenamesarrayplayers[$m]}[$i]["playernumber"]);
						$sql->execute();
						
						$i++;
						$playerspositioned++;
					}
									
					$startgroup++;
					$startorder++;
				
				}
				
			}else{

				
				for($j = 1; $j  < 4; $j++){
					
					
					$query = "
					INSERT INTO groups (startorder, track, startgroup, player)
					VALUES (:startorder, :track, :startgroup, :player)
					";
					
					
					$sql = $dbconnection->prepare($query);
					$sql->bindParam(":startorder", $startorder);
					$sql->bindParam(":track", $tracks[0]);
					$sql->bindParam(":startgroup", $startgroup);
					$sql->bindParam(":player", ${$variablenamesarrayplayers[$m]}[$i]["playernumber"]);
					$sql->execute();
					
					$i++;
					$playerspositioned++;
				}

				$startgroup++;
				$startorder++;
			}
		}
	
	}	
	
?>