<?php
$file = file_get_contents("data/game_result.json");
$data = json_decode($file,true);
echo "<h1>Game History</h1>";
foreach($data as $row){
	$gameNumber=$row['gameNumber'];
	$player1 = $row['players'][0];
	$player2 = $row['players'][1];
	$gameHistory = $row['gameHistory'];
	$score1 = $row['scores'][0];
	$score2 = $row['scores'][1];
	
	echo "<h2>Game $gameNumber </h2>";
	echo "<p>Player1 id: ".$player1['id']." gets $score1</p>";
	echo "<p>Player2 id: ".$player2['id']." gets $score2</p>";
	echo "<h3>Actions (10 Rounds)</h3>";
	foreach($gameHistory as $history){
		echo "$history<br>";
	}
}
?>
