<?php
  $filename = "./data/students.json";
  // $handle = fopen($filename, 'r') or die("File does not exist.");
  // $text = fread($handle, filesize($filename));
  // fclose($handle);
  $text = file_get_contents($filename);
  $json = json_decode($text);
  echo $text;
?>
