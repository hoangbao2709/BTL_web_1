import { useLocation } from "react-router-dom";
import { Test } from "../helper/pagination";
import { useData } from "../helper/getData";
import React, { useRef, useEffect, useState } from "react";

const Tat_ca_san_pham = (item) => {
  const [img, setImages] = useState([]);

  useEffect(() => {
    async function loadImages() {
      const imagePaths = import.meta.glob(
        "../../BackEnd/php/images/tat_ca_san_pham/**/*.{jpg,jpeg,png,gif,svg,webp}"
      );
      const imagePromises = Object.values(imagePaths).map((importer) =>
        importer()
      );
      const loadedImages = await Promise.all(imagePromises);
      setImages(loadedImages.map((module) => module.default));
    }

    loadImages();
  }, []);

  const images = useData(img, "tat_ca_san_pham", "");
  const location = useLocation();
  const pathParts = location.pathname;
  const pageNumber = pathParts.includes(item.resultLocation)
    ? pathParts.replace(item.resultLocation + "/", "")
    : pathParts.replace(item.resultLocation, "1");
  const resultLocation = pathParts.replace("/" + pageNumber, "");
  let itemNumber = "";
  if (String(pageNumber) === String(resultLocation)) {
    itemNumber = "1";
  } else itemNumber = String(pageNumber);
  return (
    <div>
      <Test
        currentPage={Number(itemNumber)}
        location={resultLocation}
        images={images}
        childWidth={item.Width}
      />
    </div>
  );
};

export default Tat_ca_san_pham;
