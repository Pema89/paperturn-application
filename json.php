<?php
$directory = 'images';
$files1 = scandir($directory);
$files1 = array_slice($files1, 2); 

echo json_encode($files1);
?>