-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 27, 2025 at 10:54 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tiem_sach`
--

-- --------------------------------------------------------

--
-- Table structure for table `favorite`
--

CREATE TABLE `favorite` (
  `id` int(255) NOT NULL,
  `name` varchar(500) NOT NULL,
  `gia_goc` varchar(500) NOT NULL,
  `gia` varchar(500) NOT NULL,
  `giam_gia` varchar(500) NOT NULL,
  `tap` varchar(500) NOT NULL,
  `tac_gia` varchar(500) NOT NULL,
  `doi_tuong` varchar(500) NOT NULL,
  `khuon_kho` varchar(500) NOT NULL,
  `so_trang` varchar(500) NOT NULL,
  `trong_luong` varchar(500) NOT NULL,
  `Page` varchar(500) NOT NULL,
  `Status` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `favorite`
--

INSERT INTO `favorite` (`id`, `name`, `gia_goc`, `gia`, `giam_gia`, `tap`, `tac_gia`, `doi_tuong`, `khuon_kho`, `so_trang`, `trong_luong`, `Page`, `Status`) VALUES
(4, 'Chúa tể bóng tối (Manga)​​​​​​​', '1000000', '900000', '10', '6', 'Daisuke Aizawa', 'Tuổi trưởng thành (trên 18 tuổi)', '13x18 cm', '144', '165', 'tat_ca_san_pham', 'Active'),
(5, 'Chúa tể bóng tối (Manga)​​​​​​​', '1000000', '900000', '10', '6', 'Daisuke Aizawa', 'Tuổi trưởng thành (trên 18 tuổi)', '13x18 cm', '144', '165', 'tat_ca_san_pham', 'Active'),
(6, 'Chúa tể bóng tối (Manga)​​​​​​​', '1000000', '900000', '10', '6', 'Daisuke Aizawa', 'Tuổi trưởng thành (trên 18 tuổi)', '13x18 cm', '144', '165', 'tat_ca_san_pham', 'Active'),
(7, 'Chúa tể bóng tối (Manga)​​​​​​​', '1000000', '900000', '10', '6', 'Daisuke Aizawa', 'Tuổi trưởng thành (trên 18 tuổi)', '13x18 cm', '144', '165', 'tat_ca_san_pham', 'Active'),
(8, 'Chúa tể bóng tối (Manga)​​​​​​​', '1000000', '900000', '10', '6', 'Daisuke Aizawa', 'Tuổi trưởng thành (trên 18 tuổi)', '13x18 cm', '144', '165', 'tat_ca_san_pham', 'Active'),
(9, 'Chúa tể bóng tối (Manga)​​​​​​​', '1000000', '900000', '10', '6', 'Daisuke Aizawa', 'Tuổi trưởng thành (trên 18 tuổi)', '13x18 cm', '144', '165', 'tat_ca_san_pham', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `kien_thuc_khoa_hoc`
--

CREATE TABLE `kien_thuc_khoa_hoc` (
  `id` int(255) NOT NULL,
  `name` varchar(500) NOT NULL,
  `gia_goc` varchar(500) NOT NULL,
  `gia` varchar(500) NOT NULL,
  `giam_gia` varchar(500) NOT NULL,
  `tap` varchar(500) NOT NULL,
  `tac_gia` varchar(500) NOT NULL,
  `doi_tuong` varchar(500) NOT NULL,
  `khuon_kho` varchar(500) NOT NULL,
  `so_trang` varchar(500) NOT NULL,
  `trong_luong` varchar(500) NOT NULL,
  `Page` varchar(500) NOT NULL,
  `Status` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lich_su_truyen_thong`
--

CREATE TABLE `lich_su_truyen_thong` (
  `id` int(255) NOT NULL,
  `name` varchar(500) NOT NULL,
  `gia_goc` varchar(500) NOT NULL,
  `gia` varchar(500) NOT NULL,
  `giam_gia` varchar(500) NOT NULL,
  `tap` varchar(500) NOT NULL,
  `tac_gia` varchar(500) NOT NULL,
  `doi_tuong` varchar(500) NOT NULL,
  `khuon_kho` varchar(500) NOT NULL,
  `so_trang` varchar(500) NOT NULL,
  `trong_luong` varchar(500) NOT NULL,
  `Page` varchar(500) NOT NULL,
  `Status` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `store`
--

CREATE TABLE `store` (
  `id` int(255) NOT NULL,
  `name` varchar(500) NOT NULL,
  `gia_goc` varchar(500) NOT NULL,
  `gia` varchar(500) NOT NULL,
  `giam_gia` varchar(500) NOT NULL,
  `tap` varchar(500) NOT NULL,
  `tac_gia` varchar(500) NOT NULL,
  `doi_tuong` varchar(500) NOT NULL,
  `khuon_kho` varchar(500) NOT NULL,
  `so_trang` varchar(500) NOT NULL,
  `trong_luong` varchar(500) NOT NULL,
  `Page` varchar(500) NOT NULL,
  `Status` varchar(500) NOT NULL,
  `so_luong` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `store`
--

INSERT INTO `store` (`id`, `name`, `gia_goc`, `gia`, `giam_gia`, `tap`, `tac_gia`, `doi_tuong`, `khuon_kho`, `so_trang`, `trong_luong`, `Page`, `Status`, `so_luong`) VALUES
(5, 'Chúa tể bóng tối (Manga)​​​​​​​', '1000000', '900000', '10', '6', 'Daisuke Aizawa', 'Tuổi trưởng thành (trên 18 tuổi)', '13x18 cm', '144', '165', 'tat_ca_san_pham', 'Active', 1),
(7, 'Chúa tể bóng tối (Manga)​​​​​​​', '1000000', '900000', '10', '6', 'Daisuke Aizawa', 'Tuổi trưởng thành (trên 18 tuổi)', '13x18 cm', '144', '165', 'tat_ca_san_pham', 'Active', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tat_ca_san_pham`
--

CREATE TABLE `tat_ca_san_pham` (
  `id` int(255) NOT NULL,
  `name` varchar(500) NOT NULL,
  `gia_goc` varchar(500) NOT NULL,
  `gia` varchar(500) NOT NULL,
  `giam_gia` varchar(500) NOT NULL,
  `tap` varchar(500) NOT NULL,
  `tac_gia` varchar(500) NOT NULL,
  `doi_tuong` varchar(500) NOT NULL,
  `khuon_kho` varchar(500) NOT NULL,
  `so_trang` varchar(500) NOT NULL,
  `trong_luong` varchar(500) NOT NULL,
  `Page` varchar(500) NOT NULL,
  `Status` varchar(500) NOT NULL,
  `from` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tat_ca_san_pham`
--

INSERT INTO `tat_ca_san_pham` (`id`, `name`, `gia_goc`, `gia`, `giam_gia`, `tap`, `tac_gia`, `doi_tuong`, `khuon_kho`, `so_trang`, `trong_luong`, `Page`, `Status`, `from`) VALUES
(9, 'Chúa tể bóng tối (Manga)​​​​​​​', '1000000', '900000', '10', '6', 'Daisuke Aizawa', 'Tuổi trưởng thành (trên 18 tuổi)', '13x18 cm', '144', '165', 'tat_ca_san_pham', 'Active', '');

-- --------------------------------------------------------

--
-- Table structure for table `truyen_tranh`
--

CREATE TABLE `truyen_tranh` (
  `id` int(255) NOT NULL,
  `name` varchar(500) NOT NULL,
  `gia_goc` varchar(500) NOT NULL,
  `gia` varchar(500) NOT NULL,
  `giam_gia` varchar(500) NOT NULL,
  `tap` varchar(500) NOT NULL,
  `tac_gia` varchar(500) NOT NULL,
  `doi_tuong` varchar(500) NOT NULL,
  `khuon_kho` varchar(500) NOT NULL,
  `so_trang` varchar(500) NOT NULL,
  `trong_luong` varchar(500) NOT NULL,
  `Page` varchar(500) NOT NULL,
  `Status` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `van_hoc_nuoc_ngoai`
--

CREATE TABLE `van_hoc_nuoc_ngoai` (
  `id` int(255) NOT NULL,
  `name` varchar(500) NOT NULL,
  `gia_goc` varchar(500) NOT NULL,
  `gia` varchar(500) NOT NULL,
  `giam_gia` varchar(500) NOT NULL,
  `tap` varchar(500) NOT NULL,
  `tac_gia` varchar(500) NOT NULL,
  `doi_tuong` varchar(500) NOT NULL,
  `khuon_kho` varchar(500) NOT NULL,
  `so_trang` varchar(500) NOT NULL,
  `trong_luong` varchar(500) NOT NULL,
  `Page` varchar(500) NOT NULL,
  `Status` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `van_hoc_viet_nam`
--

CREATE TABLE `van_hoc_viet_nam` (
  `id` int(255) NOT NULL,
  `name` varchar(500) NOT NULL,
  `gia_goc` varchar(500) NOT NULL,
  `gia` varchar(500) NOT NULL,
  `giam_gia` varchar(500) NOT NULL,
  `tap` varchar(500) NOT NULL,
  `tac_gia` varchar(500) NOT NULL,
  `doi_tuong` varchar(500) NOT NULL,
  `khuon_kho` varchar(500) NOT NULL,
  `so_trang` varchar(500) NOT NULL,
  `trong_luong` varchar(500) NOT NULL,
  `Page` varchar(500) NOT NULL,
  `Status` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wings_book`
--

CREATE TABLE `wings_book` (
  `id` int(255) NOT NULL,
  `name` varchar(500) NOT NULL,
  `gia_goc` varchar(500) NOT NULL,
  `gia` varchar(500) NOT NULL,
  `giam_gia` varchar(500) NOT NULL,
  `tap` varchar(500) NOT NULL,
  `tac_gia` varchar(500) NOT NULL,
  `doi_tuong` varchar(500) NOT NULL,
  `khuon_kho` varchar(500) NOT NULL,
  `so_trang` varchar(500) NOT NULL,
  `trong_luong` varchar(500) NOT NULL,
  `Page` varchar(500) NOT NULL,
  `Status` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `favorite`
--
ALTER TABLE `favorite`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kien_thuc_khoa_hoc`
--
ALTER TABLE `kien_thuc_khoa_hoc`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lich_su_truyen_thong`
--
ALTER TABLE `lich_su_truyen_thong`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `store`
--
ALTER TABLE `store`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tat_ca_san_pham`
--
ALTER TABLE `tat_ca_san_pham`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `truyen_tranh`
--
ALTER TABLE `truyen_tranh`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `van_hoc_nuoc_ngoai`
--
ALTER TABLE `van_hoc_nuoc_ngoai`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `van_hoc_viet_nam`
--
ALTER TABLE `van_hoc_viet_nam`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wings_book`
--
ALTER TABLE `wings_book`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `favorite`
--
ALTER TABLE `favorite`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `kien_thuc_khoa_hoc`
--
ALTER TABLE `kien_thuc_khoa_hoc`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2147483648;

--
-- AUTO_INCREMENT for table `lich_su_truyen_thong`
--
ALTER TABLE `lich_su_truyen_thong`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2147483648;

--
-- AUTO_INCREMENT for table `store`
--
ALTER TABLE `store`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `tat_ca_san_pham`
--
ALTER TABLE `tat_ca_san_pham`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2147483648;

--
-- AUTO_INCREMENT for table `truyen_tranh`
--
ALTER TABLE `truyen_tranh`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2147483648;

--
-- AUTO_INCREMENT for table `van_hoc_nuoc_ngoai`
--
ALTER TABLE `van_hoc_nuoc_ngoai`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2147483648;

--
-- AUTO_INCREMENT for table `van_hoc_viet_nam`
--
ALTER TABLE `van_hoc_viet_nam`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2147483648;

--
-- AUTO_INCREMENT for table `wings_book`
--
ALTER TABLE `wings_book`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2147483648;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
