<?php
  $filename = "./data/students.json";
  $text = file_get_contents($filename);
  // $json = json_decode($text);
  echo $text;
?>
