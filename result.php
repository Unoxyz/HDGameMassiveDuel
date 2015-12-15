<?php

$data = file_get_contents('php://input', true);
$json = json_decode($data, true);

// game_result.json
$handle1 = fopen('./data/game_result.json', 'w') or die("Failed to write 'game_result.json' file.");
$text = json_encode($json['gameResults'], JSON_UNESCAPED_UNICODE);
fwrite($handle1, $text) or die("Could not write to 'game_result.json' file.");
fclose($handle1);
echo "File 'game_result.json' successfully updated.<br />";

// player_result.json
$handle2 = fopen('./data/player_result.json', 'w') or die("Failed to write 'player_result.json' file.");
$text = json_encode($json['players'], JSON_UNESCAPED_UNICODE);
fwrite($handle2, $text) or die("Could not write to 'player_result.json' file.");
fclose($handle2);
echo "File 'player_result.json' successfully updated.<br />";

?>
