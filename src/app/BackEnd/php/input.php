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
$giam_gia = mysqli_real_escape_string($conn, $_POST["giam_gia"]);
$gia = intval( $gia_goc - ($gia_goc * $giam_gia)/100);
$tap = mysqli_real_escape_string($conn, $_POST["tap"]);
$tac_gia = mysqli_real_escape_string($conn, $_POST["tac_gia"]);
$doi_tuong = mysqli_real_escape_string($conn, $_POST["doi_tuong"]);
$khuon_kho = mysqli_real_escape_string($conn, $_POST["khuon_kho"]);
$so_trang = mysqli_real_escape_string($conn, $_POST["so_trang"]);
$trong_luong = mysqli_real_escape_string($conn, $_POST["trong_luong"]);
$status = "Active";

$tables = [
    "Kien_thuc_khoa_hoc",
    "Lich_su_truyen_thong",
    "Truyen_tranh",
    "Van_hoc_nuoc_ngoai",
    "Van_hoc_Viet_Nam",
    "Wings_book",
];

$isActive = [
    'kien_thuc_khoa_hoc' => false,
    'lich_su_truyen_thong' => false,
    'truyen_tranh' => false,
    'van_hoc_nuoc_ngoai' => false,
    'van_hoc_viet_nam' => false,
    'wings_book' => false,
];


$sql = "INSERT INTO tat_ca_san_pham (id, name, gia_goc, gia, giam_gia, tap, tac_gia, doi_tuong, khuon_kho, so_trang, trong_luong, Page, Status) 
        VALUES ('$id', '$name', '$gia_goc', '$gia', '$giam_gia', '$tap', '$tac_gia', '$doi_tuong', '$khuon_kho', '$so_trang', '$trong_luong', 'tat_ca_san_pham', 'Active')";

if ($conn->query($sql) === TRUE) {
} 

foreach ($tables as $table) {
    if (isset($_POST[$table])) {
        echo $table;
        $sql = "INSERT INTO " . strtolower($table) . "(id, name, gia_goc, gia, giam_gia, tap, tac_gia, doi_tuong, khuon_kho, so_trang, trong_luong, Page, Status)
                VALUES ('$id', '$name', '$gia_goc', '$gia', '$giam_gia', '$tap', '$tac_gia', '$doi_tuong', '$khuon_kho', '$so_trang', '$trong_luong', '$table', 'Active')";

        if ($conn->query($sql) === TRUE) {
            $isActive[strtolower($table)] = true;
        } 
    }
}


$upload_dirs = [
    'kien_thuc_khoa_hoc' => './images/kien_thuc_khoa_hoc/' . $id . '/',
    'lich_su_truyen_thong' => './images/lich_su_truyen_thong/' . $id . '/',
    'tat_ca_san_pham' => './images/tat_ca_san_pham/' . $id . '/',
    'truyen_tranh' => './images/truyen_tranh/' . $id . '/',
    'van_hoc_nuoc_ngoai' => './images/van_hoc_nuoc_ngoai/' . $id . '/',
    'van_hoc_viet_nam' => './images/van_hoc_viet_nam/' . $id . '/',
    'wings_book' => './images/wings_book/' . $id . '/'
];

$test = true;

if (isset($_FILES['file'])) {
    foreach ($_FILES['file']['name'] as $key => $name) {
        $temp_path = $_FILES['file']['tmp_name'][$key];
        $filename = $id . '_' . basename($name);

        if($test == true){
            $test = false;
            $filename = $id . '_isReview_' . basename($name);
        }

        $target_path = $upload_dirs['tat_ca_san_pham'] . $filename;

        if (!file_exists($upload_dirs['tat_ca_san_pham'])) {
            mkdir($upload_dirs['tat_ca_san_pham'], 0777, true);
        }

        if (move_uploaded_file($temp_path, $target_path)) {
            if ($isActive['kien_thuc_khoa_hoc']) {
                if (!file_exists($upload_dirs['kien_thuc_khoa_hoc'])) {
                    mkdir($upload_dirs['kien_thuc_khoa_hoc'], 0777, true);
                }
                copy($target_path, $upload_dirs['kien_thuc_khoa_hoc'] . $filename);
            }
            if ($isActive['lich_su_truyen_thong']) {
                if (!file_exists($upload_dirs['lich_su_truyen_thong'])) {
                    mkdir($upload_dirs['lich_su_truyen_thong'], 0777, true);
                }
                copy($target_path, $upload_dirs['lich_su_truyen_thong'] . $filename);
            }
            if ($isActive['truyen_tranh']) {
                if (!file_exists($upload_dirs['truyen_tranh'])) {
                    mkdir($upload_dirs['truyen_tranh'], 0777, true);
                }
                copy($target_path, $upload_dirs['truyen_tranh'] . $filename);
            }
            if ($isActive['van_hoc_nuoc_ngoai']) {
                if (!file_exists($upload_dirs['van_hoc_nuoc_ngoai'])) {
                    mkdir($upload_dirs['van_hoc_nuoc_ngoai'], 0777, true); 
                }
                copy($target_path, $upload_dirs['van_hoc_nuoc_ngoai'] . $filename);
            }
            if ($isActive['van_hoc_viet_nam']) {
                if (!file_exists($upload_dirs['van_hoc_viet_nam'])) {
                    mkdir($upload_dirs['van_hoc_viet_nam'], 0777, true); 
                }
                copy($target_path, $upload_dirs['van_hoc_viet_nam'] . $filename);
            }
            if ($isActive['wings_book']) {
                if (!file_exists($upload_dirs['wings_book'])) {
                    mkdir($upload_dirs['wings_book'], 0777, true);
                }
                copy($target_path, $upload_dirs['wings_book'] . $filename);
            }
        }
    }
}

$conn->close();
?>