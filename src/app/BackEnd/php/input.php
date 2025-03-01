<?php 
// $servername = "localhost";
// $username = "root";
// $password = "";
// $dbname = "tiem_sach";

// $conn = new mysqli($servername, $username, $password, $dbname);

// if ($conn->connect_error) {
//     die("Kết nối thất bại: " . $conn->connect_error);
// }

header('Access-Control-Allow-Origin: http://localhost:3000');

// $id = mysqli_real_escape_string($conn, $_POST["id"]);
// $name = mysqli_real_escape_string($conn, $_POST["name"]);
// $gia_goc = mysqli_real_escape_string($conn, $_POST["gia_goc"]);
// $gia = mysqli_real_escape_string($conn, $_POST["gia"]);
// $giam_gia = mysqli_real_escape_string($conn, $_POST["giam_gia"]);
// $link = mysqli_real_escape_string($conn, $_POST["link"]);

// if (isset($_POST["Kien_thuc_khoa_hoc"])) {
//     $conn->set_charset("utf8");
//     $sql = "INSERT INTO kien_thuc_khoa_hoc (id, name, gia_goc, gia, giam_gia, Link) 
//             VALUES ('$id', '$name', '$gia_goc', '$gia', '$giam_gia', '$link')";
// } 
// if (isset($_POST["Lich_su_truyen_thong"])) {
//     $conn->set_charset("utf8");
//     $sql = "INSERT INTO lich_su_truyen_thong (id, name, gia_goc, gia, giam_gia, Link) 
//             VALUES ('$id', '$name', '$gia_goc', '$gia', '$giam_gia', '$link')";
// } 
// if (isset($_POST["Tat_ca_san_pham"])) {
//     $conn->set_charset("utf8");
//     $sql = "INSERT INTO tat_ca_san_pham (id, name, gia_goc, gia, giam_gia, Link) 
//             VALUES ('$id', '$name', '$gia_goc', '$gia', '$giam_gia', '$link')";
// } 
// if (isset($_POST["Truyen_tranh"])) {
//     $conn->set_charset("utf8");
//     $sql = "INSERT INTO truyen_tranh (id, name, gia_goc, gia, giam_gia, Link) 
//             VALUES ('$id', '$name', '$gia_goc', '$gia', '$giam_gia', '$link')";
// } 
// if (isset($_POST["Van_hoc_nuoc_ngoai"])) {
//     $conn->set_charset("utf8");
//     $sql = "INSERT INTO van_hoc_nuoc_ngoai (id, name, gia_goc, gia, giam_gia, Link) 
//             VALUES ('$id', '$name', '$gia_goc', '$gia', '$giam_gia', '$link')";
// } 
// if (isset($_POST["Van_hoc_Viet_Nam"])) {
//     $conn->set_charset("utf8");
//     $sql = "INSERT INTO van_hoc_viet_nam (id, name, gia_goc, gia, giam_gia, Link) 
//             VALUES ('$id', '$name', '$gia_goc', '$gia', '$giam_gia', '$link')";
// } 
// if (isset($_POST["Wings_book"])) {
//     $conn->set_charset("utf8");
//     $sql = "INSERT INTO wings_book (id, name, gia_goc, gia, giam_gia, Link) 
//             VALUES ('$id', '$name', '$gia_goc', '$gia', '$giam_gia', '$link')";
// } 

if(isset($_FILES['file'])){
    
    $arr_file_types = ['image/png', 'image/gif', 'image/jpg', 'image/jpeg'];
      
    if (!(in_array($_FILES['file']['type'], $arr_file_types))) {
        echo "false";
        return;
    }
      
    if (!file_exists('uploads')) {
        mkdir('uploads', 0777);
    }
      
    $filename = time().'_'.$_FILES['file']['name'];
      
    move_uploaded_file($_FILES['file']['tmp_name'], 'uploads/'.$filename);
      
    echo 'uploads/'.$filename;
    die;
    
}


echo '<pre>';
var_dump($_POST);
echo '</pre>';

// $conn->close();
?>