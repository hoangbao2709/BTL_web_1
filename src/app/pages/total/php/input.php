<?php 
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "tiem_sach";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}

header('Access-Control-Allow-Origin: http://localhost:3000');

// $id = mysqli_real_escape_string($conn, $_POST["id"]);
// $name = mysqli_real_escape_string($conn, $_POST["name"]);
// $gia_goc = mysqli_real_escape_string($conn, $_POST["gia_goc"]);
// $gia = mysqli_real_escape_string($conn, $_POST["gia"]);
// $giam_gia = mysqli_real_escape_string($conn, $_POST["giam_gia"]);
// $link = mysqli_real_escape_string($conn, $_POST["link"]);

// $conn->set_charset("utf8");

// $sql = "INSERT INTO tat_ca_san_pham (id, name, gia_goc, gia, giam_gia, Link) 
//         VALUES ('$id', '$name', '$gia_goc', '$gia', '$giam_gia', '$link')";

// if ($conn->query($sql) === TRUE) {

// } else {
//     echo "Error: " . $sql . "<br>" . $conn->error;
// }

var_dump($_POST);

$conn->close();
?>