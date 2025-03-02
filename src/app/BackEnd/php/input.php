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
$conn->set_charset("utf8");

$id = mysqli_real_escape_string($conn, $_POST["id"]);
$name = mysqli_real_escape_string($conn, $_POST["name"]);
$gia_goc = mysqli_real_escape_string($conn, $_POST["gia_goc"]);
$gia = mysqli_real_escape_string($conn, $_POST["gia"]);
$giam_gia = mysqli_real_escape_string($conn, $_POST["giam_gia"]);
$hehe = false;

$tables = [
    "Kien_thuc_khoa_hoc",
    "Lich_su_truyen_thong",
    "Truyen_tranh",
    "Van_hoc_nuoc_ngoai",
    "Van_hoc_Viet_Nam",
    "Wings_book"
];

$isActive = [
    'kien_thuc_khoa_hoc' => false,
    'lich_su_truyen_thong' => false,
    'truyen_tranh' => false,
    'van_hoc_nuoc_ngoai' => false,
    'van_hoc_viet_nam' => false,
    'wings_book' => false
];

foreach ($tables as $table) {
    if (isset($_POST[$table])) {
        $hehe = true;
        $sql = "INSERT INTO " . strtolower($table) . " (id, name, gia_goc, gia, giam_gia) 
                VALUES ('$id', '$name', '$gia_goc', '$gia', '$giam_gia')";
        if ($conn->query($sql) === TRUE) {
            $isActive[strtolower($table)] = true;
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
}

echo "Active: " . ($isActive['kien_thuc_khoa_hoc'] ? 'true' : 'false');

$upload_dirs = [
    'kien_thuc_khoa_hoc' => './images/kien_thuc_khoa_hoc/',
    'lich_su_truyen_thong' => './images/lich_su_truyen_thong/',
    'tat_ca_san_pham' => './images/tat_ca_san_pham/',
    'truyen_tranh' => './images/truyen_tranh/',
    'van_hoc_nuoc_ngoai' => './images/van_hoc_nuoc_ngoai/',
    'van_hoc_viet_nam' => './images/van_hoc_viet_nam/',
    'wings_book' => './images/wings_book/'
];

if (isset($_FILES['file'])) {
    foreach ($_FILES['file']['name'] as $key => $name) {
        $filename = time() . '_' . basename($name);
        $temp_path = $_FILES['file']['tmp_name'][$key];
        $target_path = $upload_dirs['tat_ca_san_pham'] . $filename;
        if (move_uploaded_file($temp_path, $target_path)) {
            if ($isActive['kien_thuc_khoa_hoc']) {
                copy($target_path, $upload_dirs['kien_thuc_khoa_hoc'] . $filename);
            }
            if ($isActive['lich_su_truyen_thong']) {
                copy($target_path, $upload_dirs['lich_su_truyen_thong'] . $filename);
            }
            if ($isActive['truyen_tranh']) {
                copy($target_path, $upload_dirs['truyen_tranh'] . $filename);
            }
            if ($isActive['van_hoc_nuoc_ngoai']) {
                copy($target_path, $upload_dirs['van_hoc_nuoc_ngoai'] . $filename);
            }
            if ($isActive['van_hoc_viet_nam']) {
                copy($target_path, $upload_dirs['van_hoc_viet_nam'] . $filename);
            }
            if ($isActive['wings_book']) {
                copy($target_path, $upload_dirs['wings_book'] . $filename);
            }
        } else {
            echo "Lỗi khi tải tệp lên: " . $_FILES['file']['error'][$key] . "<br>";
        }
    }
}

$conn->close();
?>