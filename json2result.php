<?php
$file = file_get_contents("data/player_result.json");
$data = json_decode($file,true);
foreach($data as $row){
	$id=$row['studentId'];
	$name=$row['name'];
	$totalScore=array_sum($row['gameScore']);
	echo "$id,$name,$totalScore<br>";
}
?>
