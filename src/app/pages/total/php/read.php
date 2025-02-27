<?php
    $severname = "localhost";
    $username = "root";
    $password = "";
    $dbname = "tiem_sach";
    $conn = new mysqli(hostname: $severname, username: $username, password: $password, database: $dbname);
    if($conn->connect_error){
        die("Kết nối thất bại". $conn->connect_error);
    }
    mysqli_set_charset(mysql: $conn, charset:"utf8");
    echo"Kết nối thành công";
    $sql = 'SELECT * FROM item';
    $result = $conn->query($sql);
    if($result->num_rows > 0){
        var_dump(value: $row);
    }
    $conn->close();
?>