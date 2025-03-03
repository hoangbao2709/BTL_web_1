<?php

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$sql = "SELECT * FROM kien_thuc_khoa_hoc";

$stmt = $conn->prepare($sql);
$stmt->execute();
$users = $stmt->fetch(PDO::FETCH_ASSOC);


echo json_encode($users);
?>