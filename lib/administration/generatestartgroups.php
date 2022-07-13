<?php

	//generate all male club groups and store in array
	//generate all female club groups and store in array
	////genrate all male single player groups and store in array
	//generate alle female single groups and store in array

	//require('../validatelogin.php');	
	include('../dbconfig.php');

	$numbergroupsclubmale = count(buildclubgroups("H"));
	$numbergroupsclubfemale =count(buildclubgroups("D"));

	$numberofgroupssinglemale = count(buildsinglegroups("H"));
	$numberofgroupssinglefemale = count(buildsinglegroups("D"));

	//total number of groups in tournament
	$totalnumberofgroups = $numbergroupsclubmale + $numbergroupsclubfemale + $numberofgroupssinglemale + $numberofgroupssinglefemale;
	
	//echo($totalnumberofgroups);

	$maxgroupspertrack = ceil($totalnumberofgroups / 2);

	echo($maxgroupspertrack);

	
	function buildclubgroups($gender){
		
		include('../dbconfig.php');
		
		//get all male groups and order by startorder
		$query = "
			SELECT id
			FROM clubs
			WHERE category = :category
			ORDER BY startorder ASC
		";

		$sql = $dbconnection->prepare($query);
		$sql->bindParam(":category", $gender);
		$sql->execute();
		$clubs = $sql->fetchAll();

		//number of clubs
		$numberofclubs = count($clubs);

		
		//array for storing sorted players
		$sortedplayers = [];
		
		//position inside sorted players array
		$playerordercounter = 0;

		//vairable storing current player position inside club
		$playerposition = 1;

		//variable checking if no player was found for that position
		$noplayersfound = 0;

		//competition type
		$comptypeclub = 1;
		$comptypeboth = 3;

		//fill array with players ordered
		while($noplayersfound < $numberofclubs){
			
			//reset number of players not found
			$noplayersfound = 0;
			
			//loop trough clubs a retrieve the player for current position
			for($i = 0; $i < $numberofclubs; $i++){
				
				//select player fitting according to current position
				//taking into account how the player is competing
				$query = "
					SELECT playernumber, club
					FROM players
					WHERE playerorderteam = :playerposition
					AND club = :club
					AND (comptype = :comptypeclub OR comptype = :comptypesingle) 
				";
				
				$sql = $dbconnection->prepare($query);
				$sql->bindParam(":playerposition", $playerposition);
				$sql->bindParam(":club", $clubs[$i]["id"]);
				$sql->bindParam(":comptypeclub", $comptypeclub);
				$sql->bindParam(":comptypesingle", $comptypeboth);
				$sql->execute();
				$nextplayer = $sql->fetchAll(PDO::FETCH_ASSOC);
				
				//if no player is found for taht position count number of player not found up by one
				if(count($nextplayer) == 0){
					$noplayersfound++;
				}else{
					//if palyer is found, add it to the array
					$sortedplayers[$playerordercounter]["playernumber"] = $nextplayer[0]["playernumber"];
					$sortedplayers[$playerordercounter]["club"] = $nextplayer[0]["club"];
					$playerordercounter++;
				};
				
	
			}
			
			//increase player inside club order position by one
			$playerposition++;
			
		}

		//array for storing groups
		$groups = [];

		//number of sorted players
		$numberofsortedplayers = count($sortedplayers);

		//variable for startgroup
		$startgroup = 1;

		//number of players which have been positioned into a group
		$playerspositioned = 0;

		$i = 0;

		while($i < $numberofsortedplayers){
			


			//number of players left to be placed in groups
			$playerrest = $numberofsortedplayers - $playerspositioned;
			
			//if not players are left, stop loop
			if($playerrest == 0){
				break;
			}
			
			//test if rest ist 4 players
			//if yes, last two groups will contain two players each
			if($playerrest == 4){

				for($k = 0; $k < 2; $k++){

					for($j = 0; $j  < 2; $j++){
						
						$groups[$startgroup][$j] = $sortedplayers[$i]["playernumber"];
						
						$i++;
						$playerspositioned++;
					}
									
					$startgroup++;
				
				}
				
			}else{
				
				//if only two players are left, last group has only two players
				//else group has three players
				if($playerrest == 2){
					$playerspergroup = 2;
				}else{
					$playerspergroup = 3;
				}
				
				//build startgroup
				for($j = 0; $j  < $playerspergroup; $j++){
					
					
					$groups[$startgroup][$j] = $sortedplayers[$i]["playernumber"];
					
					$i++;
					$playerspositioned++;
				}

				$startgroup++;
			}
		}

		
		return $groups;
		
	}

	function buildsinglegroups($gender){
		include('../dbconfig.php');

		$query = "
			SELECT MAX(startgroupsingle)
			FROM players
			WHERE gender = :gender
		";

		$sql = $dbconnection->prepare($query);
		$sql->bindParam(":gender", $gender);
		$sql->execute();
		$numberofgroups = $sql->fetch(PDO::FETCH_ASSOC);

		
		//array for storing groups
		$groups = [];


		for($i = 1; $i <= $numberofgroups["MAX(startgroupsingle)"]; $i++){
			$query = "
				SELECT playernumber
				FROM players
				WHERE gender = :gender
				AND startgroupsingle = :startgroupsingle
				ORDER BY playerordersingle ASC
			";

			$sql = $dbconnection->prepare($query);
			$sql->bindParam(":gender", $gender);
			$sql->bindParam(":startgroupsingle", $i);
			$sql->execute();
			$playersingroup = $sql->fetchAll(PDO::FETCH_ASSOC);

			//var_dump($playersingroup);
			
			//echo(count($playersingroup));
			//echo("<br>");
			
			for($j = 0; $j < count($playersingroup); $j++){
				$groups[$i][$j] = $playersingroup[$j];
			}

			
		}

		return $groups;
	}


	

	/*



	//variable for startorder
	$startorder = 1;
	
	$variablenamesarrayplayers = ["playersorderedmale", "playersorderedfemale"];
	$vairablenamesclubs = ["clubsmale", "clubsfemale"];
	$variablenamescount = ["numberofclubsmale", "numberofclubsfemale"];
	$track = $_POST["track"];
	$categories = [$_POST["first"], $_POST["second"]];

	$comptypeclub = 1;
	$comptypeboth = 3;
	
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
					AND (comptype = :comptypeclub OR comptype = :comptypesingle) 
				";
				
				$sql = $dbconnection->prepare($query);
				$sql->bindParam(":playerposition", $playerposition);
				$sql->bindParam(":club", ${$vairablenamesclubs[$m]}[$i]["id"]);
				$sql->bindParam(":comptypeclub", $comptypeclub);
				$sql->bindParam(":comptypesingle", $comptypeboth);
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
			
			//if not players are left, stop loop
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
						$sql->bindParam(":track", $track);
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
				
				//if only two teams are left, last group has only two players
				//else group has three players
				if($playerrest == 2){
					$j = 2;
				}else{
					$j = 1;
				}
				
				//build startgroup
				for($j; $j  < 4; $j++){
					
					
					$query = "
					INSERT INTO groups (startorder, track, startgroup, player)
					VALUES (:startorder, :track, :startgroup, :player)
					";


					$sql = $dbconnection->prepare($query);
					$sql->bindParam(":startorder", $startorder);
					$sql->bindParam(":track", $track);
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

	echo(json_encode("hi"));
	*/
?>