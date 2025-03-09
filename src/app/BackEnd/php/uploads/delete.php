<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'DbConnect.php';
$objDb = new DbConnect();
$conn = $objDb->connect();

$url = isset($_GET['url']) ? $_GET['url'] : null;
$id = isset($_GET['id']) ? $_GET['id'] : null;

if ($url && $id) {
    $sql = "DELETE FROM $url WHERE id = :id"; 

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_STR);
    
    if ($stmt->execute()) {
        if ($stmt->rowCount() > 0) {
            echo json_encode(['message' => 'Status updated successfully']);
        } else {
            echo json_encode(['message' => 'No records updated']);
        }
    } else {
        echo json_encode(['message' => 'Error executing query']);
    }
} else {
    echo json_encode(['message' => 'Required parameters are missing.']);
}

$conn = null;