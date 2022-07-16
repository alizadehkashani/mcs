<?php

	//DONE	generate all male club groups and store in array
	//DONE	generate all female club groups and store in array
	//DONE	genrate all male single player groups and store in array
	//DONE	generate alle female single groups and store in array
	
	//DONE	insert all male clubs to track A
	//DONE	insert all single male groups or until track is full
	//DONE	insert all female clubs to track B or until full
	//DONE	insert all female single groups or until full to track B
	//DONE	insert rest of male single groups to track B
	//DONE	insert rest female single groups to track A

	//DONE select all groups from track A and insert into track B
	//DONE select all groups from track B and insert into track A

	echo($_POST["day"]);

	//require('../validatelogin.php');	
	include('../dbconfig.php');

	//set startgroup of both tracks to one
	$query = "
		UPDATE tracks
		SET currentgroup = :resetgroup
	";
	
	$sql = $dbconnection->prepare($query);	


	//generate club groups per gender
	$groupsclubmale = buildclubgroups("H");
	$groupsclubfemale = buildclubgroups("D");

	//number of club groups per gender
	$numbergroupsclubmale = count($groupsclubmale);
	$numbergroupsclubfemale =count($groupsclubfemale);

	//generate single groups per gender
	$groupssinglemale = buildsinglegroups("H");
	$groupssinglefemale = buildsinglegroups("D");

	//number of single groups per gender
	$numberofgroupssinglemale = count($groupssinglemale);
	$numberofgroupssinglefemale = count($groupssinglefemale);

	//total number of groups in tournament
	$totalnumberofgroups = $numbergroupsclubmale + $numbergroupsclubfemale + $numberofgroupssinglemale + $numberofgroupssinglefemale;
		
	//set maximum number of groups per track
	$maxgroupspertrack = ceil($totalnumberofgroups / 2);

	//generate initial startgroups
	generatestartgroups($groupsclubmale, $numbergroupsclubmale, $groupsclubfemale, $numbergroupsclubfemale, $groupssinglemale, $numberofgroupssinglemale, $groupssinglefemale, $numberofgroupssinglefemale, $maxgroupspertrack);


	function buildclubgroups($gender){
		
		include('../dbconfig.php');
		
		if($_POST["day"] == 1){
			//get all male groups and order by startorder
			$query = "
				SELECT id
				FROM clubs
				WHERE category = :category
				ORDER BY startorder ASC
			";
		}elseif($_POST["day"] == 2){
			//get all male groups and order by result
			$query = "
				SELECT id
				FROM clubs
				WHERE category = :category
				ORDER BY resultclub ASC, rounddiff ASC
			";
		}

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

						//begin---fill indvgroups table---
							$query = "
								INSERT INTO indvgroups (startorder, comptype, gender, playerorder, player)
								VALUES (:startorder, :comptype, :gender, :playerorder, :player)
							";

							$sql = $dbconnection->prepare($query);
							$sql->bindParam(":startorder", $startgroup);
							$sql->bindParam(":comptype", $comptypeclub);
							$sql->bindParam(":gender", $gender);
							$sql->bindParam(":playerorder", $j);
							$sql->bindParam(":player", $sortedplayers[$i]["playernumber"]);
							$sql->execute();

							echo("inser new group " . $i . $gender);

						//end---fill indvgroups table---
						
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
					//begin---fill indvgroups table---
						$query = "
							INSERT INTO indvgroups (startorder, comptype, gender, playerorder, player)
							VALUES (:startorder, :comptype, :gender, :playerorder, :player)
						";

						$sql = $dbconnection->prepare($query);
						$sql->bindParam(":startorder", $startgroup);
						$sql->bindParam(":comptype", $comptypeclub);
						$sql->bindParam(":gender", $gender);
						$sql->bindParam(":playerorder", $j);
						$sql->bindParam(":player", $sortedplayers[$i]["playernumber"]);
						$sql->execute();

						echo("inser new group " . $i . $gender);

					//end---fill indvgroups table---
					
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
				$groups[$i][$j] = $playersingroup[$j]["playernumber"];
			}

			
		}

		return $groups;
	}


	function generatestartgroups($groupsclubmale, $numbergroupsclubmale, $groupsclubfemale, $numbergroupsclubfemale, $groupssinglemale, $numberofgroupssinglemale, $groupssinglefemale, $numberofgroupssinglefemale, $maxgroupspertrack){
		//DONE//insert all male clubs track A
		//insert male single to track A until maximum number of groups per track reached
		
		//inser all female clubs to track B
		//insert all female single to track B
		//inser rest of male single to track B

		//


		include('../dbconfig.php');

		//variable for track ids
		$trackA = "A";
		$trackB = "B";

		//variable for startorder per track
		$startorderA = 1;
		$startorderB = 1;

		//number of groups per track
		$numbergroupstrackA = 0;
		$numbergroupstrackB = 0;

		//get male club groups and set amount of male club groups
		//=>//$groupsclubmale = buildclubgroups("H");
		
		//set variable for startgroup counter
		$startgroup = 1;

		//loop through male club groups and insert each group into database
		for($i = 1; $i <= $numbergroupsclubmale; $i++){

			for($j = 0; $j < count($groupsclubmale[$i]); $j++){

				$query = "
					INSERT INTO groups (startorder, track, startgroup, playerorder, player)
					VALUES (:startorder, :track, :startgroup, :playerorder, :player)
					";


				$sql = $dbconnection->prepare($query);
				$sql->bindParam(":startorder", $startorderA);
				$sql->bindParam(":track", $trackA);
				$sql->bindParam(":startgroup", $startgroup);
				$sql->bindParam(":playerorder", $j);
				$sql->bindParam(":player", $groupsclubmale[$i][$j]);
				$sql->execute();

			}
			
			$startgroup++;
			$startorderA++;
			$numbergroupstrackA++;
		}

			
		//insert male groups until max amount of groups per track is reached

		$i = 1;

		$startgroup = 1;
		
		$numberofsinglemaleinserted = 0;

	
		while($numbergroupstrackA < $maxgroupspertrack && $i <= $numberofgroupssinglemale){
	
			for($j = 0; $j < count($groupssinglemale[$i]); $j++){

				$query = "
					INSERT INTO groups (startorder, track, startgroup, playerorder, player)
					VALUES (:startorder, :track, :startgroup, :playerorder, :player)
				";


				$sql = $dbconnection->prepare($query);
				$sql->bindParam(":startorder", $startorderA);
				$sql->bindParam(":track", $trackA);
				$sql->bindParam(":startgroup", $startgroup);
				$sql->bindParam(":playerorder", $j);				
				$sql->bindParam(":player", $groupssinglemale[$i][$j]);
				$sql->execute();

			}
			
			$numberofsinglemaleinserted++;
			$startgroup++;
			$startorderA++;
			$numbergroupstrackA++;
			$i++;
		}

		
		//set variable for startgroup counter
		$startgroup = 1;
		
		//insert all female club groups to track B
		for($i = 1; $i < $numbergroupsclubfemale; $i++){
			
			
			//$groupsclubfemale
			
			for($j = 0; $j < count($groupsclubfemale[$i]); $j++){

				$query = "
					INSERT INTO groups (startorder, track, startgroup, playerorder, player)
					VALUES (:startorder, :track, :startgroup, :playerorder, :player)
					";


				$sql = $dbconnection->prepare($query);
				$sql->bindParam(":startorder", $startorderB);
				$sql->bindParam(":track", $trackB);
				$sql->bindParam(":startgroup", $startgroup);
				$sql->bindParam(":playerorder", $j);
				$sql->bindParam(":player", $groupsclubfemale[$i][$j]);
				$sql->execute();

			}
			
			$startgroup++;
			$startorderB++;
			$numbergroupstrackB++;
		}



		//insert all female single groups to track B
		$i = 1;

		$startgroup = 1;
		
		$numberofsinglefemaleinserted = 0;

		while($numbergroupstrackB < $maxgroupspertrack && $i <= $numberofgroupssinglefemale){


			for($j = 0; $j < count($groupssinglefemale[$i]); $j++){

				$query = "
					INSERT INTO groups (startorder, track, startgroup, playerorder, player)
					VALUES (:startorder, :track, :startgroup, :playerorder, :player)
				";


				$sql = $dbconnection->prepare($query);
				$sql->bindParam(":startorder", $startorderB);
				$sql->bindParam(":track", $trackB);
				$sql->bindParam(":startgroup", $startgroup);
				$sql->bindParam(":playerorder", $j);
				$sql->bindParam(":player", $groupssinglefemale[$i][$j]);
				$sql->execute();

			}
			
			$startgroup++;
			$startorderB++;
			$numbergroupstrackB++;
			$i++;
			$numberofsinglefemaleinserted++;
		}


		//insert rest of male single groups
		$startgroup = 1;

		for($i = $numberofsinglemaleinserted + 1; $i <= $numberofgroupssinglemale; $i++){
			
			//echo($numbergroupstrackB. " " . $i . " " . "<br>");
			

			if($numbergroupstrackB == $maxgroupspertrack){
				break;
			}

			for($j = 0; $j < count($groupssinglemale[$i]); $j++){

				$query = "
					INSERT INTO groups (startorder, track, startgroup, playerorder, player)
					VALUES (:startorder, :track, :startgroup, :playerorder, :player)
				";


				$sql = $dbconnection->prepare($query);
				$sql->bindParam(":startorder", $startorderB);
				$sql->bindParam(":track", $trackB);
				$sql->bindParam(":startgroup", $startgroup);
				$sql->bindParam(":playerorder", $j);
				$sql->bindParam(":player", $groupssinglemale[$i][$j]);
				$sql->execute();

			}
			
			//$numberofsinglemaleinserted++;
			$startgroup++;
			$startorderB++;
			$numbergroupstrackB++;
		}

		//insert rest of female single groups
		$startgroup = 1;

		
		for($i = $numberofsinglefemaleinserted + 1; $i < $numberofgroupssinglefemale; $i++){
			
			if($numbergroupstrackA == $maxgroupspertrack){
				break;
			}

			for($j = 0; $j < count($groupssinglefemale[$i]); $j++){

				$query = "
					INSERT INTO groups (startorder, track, startgroup, playerorder, player)
					VALUES (:startorder, :track, :startgroup, :playerorder, :player)
				";


				$sql = $dbconnection->prepare($query);
				$sql->bindParam(":startorder", $startorderB);
				$sql->bindParam(":track", $trackB);
				$sql->bindParam(":startgroup", $startgroup);
				$sql->bindParam(":playerorder", $j);
				$sql->bindParam(":player", $groupssinglemale[$i][$j]);
				$sql->execute();

			}
			
			//$numberofsinglemaleinserted++;
			$startgroup++;
			$startorderA++;
			$numbergroupstrackA++;
		}
		
		
		

		// select all groups from track A and insert into track B
		
		$query = "
			SELECT MAX(startorder)
			FROM groups
			WHERE track = :track
		";

		$sql = $dbconnection->prepare($query);
		$sql->bindParam(":track", $trackB);
		$sql->execute();
		$lastgroup = $sql->fetch(PDO::FETCH_ASSOC);
		$lastgroup = $lastgroup["MAX(startorder)"];

		
		for($i = 1; $i <= $lastgroup; $i++){
			$query = "
				SELECT *
				FROM groups
				WHERE track = :track
				AND startorder = :startorder
			";

			$sql = $dbconnection->prepare($query);
			$sql->bindParam(":track", $trackB);
			$sql->bindParam(":startorder", $i);
			$sql->execute();
			$group = $sql->fetchAll(PDO::FETCH_ASSOC);
			
			for($j = 0; $j < count($group); $j++){
				
				$query = "
					INSERT INTO groups (startorder, track, startgroup, playerorder, player)
					VALUES (:startorder, :track, :startgroup, :playerorder, :player)

				";

				$sql = $dbconnection->prepare($query);
				$sql->bindParam(":startorder", $startorderA);
				$sql->bindParam(":track", $trackA);
				$sql->bindParam(":startgroup", $group[$j]["startgroup"]);
				$sql->bindParam(":playerorder", $group[$j]["playerorder"]);
				$sql->bindParam(":player", $group[$j]["player"]);
				$sql->execute();
			}

			$startorderA++;
			

		}


		
		// select all groups from track B and insert into track A
		$query = "
			SELECT MAX(startorder)
			FROM groups
			WHERE track = :track
		";

		$sql = $dbconnection->prepare($query);
		$sql->bindParam(":track", $trackA);
		$sql->execute();
		$lastgroup = $sql->fetch(PDO::FETCH_ASSOC);
		$lastgroup = $lastgroup["MAX(startorder)"];

		
		for($i = 1; $i <= $lastgroup; $i++){
			$query = "
				SELECT *
				FROM groups
				WHERE track = :track
				AND startorder = :startorder
			";

			$sql = $dbconnection->prepare($query);
			$sql->bindParam(":track", $trackA);
			$sql->bindParam(":startorder", $i);
			$sql->execute();
			$group = $sql->fetchAll(PDO::FETCH_ASSOC);
			
			//echo(count($group));
			
			for($j = 0; $j < count($group); $j++){
				
				$query = "
					INSERT INTO groups (startorder, track, startgroup, playerorder, player)
					VALUES (:startorder, :track, :startgroup, :playerorder, :player)

				";

				$sql = $dbconnection->prepare($query);
				$sql->bindParam(":startorder", $startorderB);
				$sql->bindParam(":track", $trackB);
				$sql->bindParam(":startgroup", $group[$j]["startgroup"]);
				$sql->bindParam(":playerorder", $group[$j]["playerorder"]);
				$sql->bindParam(":player", $group[$j]["player"]);
				$sql->execute();
			}

			$startorderB++;
			

		}



	}	

?>