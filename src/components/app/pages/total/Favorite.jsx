import { useLocation } from "react-router-dom";
import { Test } from "../helper/pagination";
import { useData } from "../helper/getData";
import React, { useRef, useEffect, useState } from "react";

export const Favorite = (item) => {
  const [img, setImages] = useState([]);
    
  useEffect(() => {
    async function loadImages() {
      const imagePaths = import.meta.glob('../../BackEnd/php/images/tat_ca_san_pham/**/*.{jpg,jpeg,png,gif,svg,webp}');
      const imagePromises = Object.values(imagePaths).map(importer => importer());
      const loadedImages = await Promise.all(imagePromises);
      setImages(loadedImages.map(module => module.default));
    }
    loadImages();
  }, []);
  const location = useLocation();
  const pathParts = location.pathname;
  const [favourite, setFavourite] = useState([]);
  const pageNumber = pathParts.includes(item.resultLocation)
    ? pathParts.replace(item.resultLocation + "/", "")
    : pathParts.replace(item.resultLocation, "1");
  const resultLocation = pathParts.replace("/" + pageNumber, "");
  let itemNumber = "";
  if (String(pageNumber) === String(resultLocation)) {
    itemNumber = "1";
  } else itemNumber = String(pageNumber);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://localhost/BTL_web_1/src/components/app/BackEnd/php/uploads/getAllFavorite.php`
        );
        const data = await response.json();
        setFavourite(data);
      } catch (error) {
        console.error("Error fetching favorite status:", error);
      }
    };
    fetchData();
  }, [favourite]);
  let image = useState([]);
  const getImg = (img) => {
    let result = [];
    if (favourite.length > 0)
      favourite.forEach((element) => {
        const filteredImages = img.filter((ele) => {
          const fileName = ele.split("/");
          const pathParts = fileName[fileName.length - 1].split("_");
          return (
            pathParts.includes("0") && pathParts.includes(element.id.toString())
          );
        });
        result.push(filteredImages);
      });
    result = result.flat();
    return result;
  };

  image = getImg(img);

  const images = useData(image, "tat_ca_san_pham", "");

  return (
    <div>
      <Test
        currentPage={Number(itemNumber)}
        location={resultLocation}
        images={images}
        childWidth={item.Width}
        favourite={favourite}
      />
    </div>
  );
};

export default Favorite;
