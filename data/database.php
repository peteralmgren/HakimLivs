<?php
$dbuser = 'vhqbuuzxxzzixt';
$dbpass = '84fd103bc84a44a2d778d59354f95f4c79f80215e89f41a07a54158d70b91777';
$host = 'ec2-54-155-87-214.eu-west-1.compute.amazonaws.com';
$dbname = 'dbh3o0tomtrf16';
$dbh = new PDO("pgsql:host=$host;dbname=$dbname", $dbuser, $dbpass);
?>