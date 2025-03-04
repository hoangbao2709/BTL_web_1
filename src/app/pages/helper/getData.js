import React, { useState, useEffect } from 'react';

export function useData(img) {  

  const [data, setData] = useState([]);
  const [images, setImages] = useState([]);
  useEffect(() => {
    fetch('https://localhost//BTL_web_1/src/app/BackEnd/php/uploads/index.php')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const getData = {};
      data.forEach((element) => {
        getData[element.id] = element;
      });

      let items = [];
      let number = "";
      let tempImg = [];
      tempImg.push(img[0]);
      for (let i = 0; i < img.length; i++) {
        const fileName = img[i].split('/').pop();
        const tempNumber = fileName.split('_')[0];

        if (number !== tempNumber) {
          if (getData[parseInt(tempNumber)]) {
            let tempItem = {
              img: tempImg,
              gia_goc: getData[parseInt(tempNumber)]["gia_goc"],
              gia: getData[parseInt(tempNumber)]["gia"],
              giam_gia: getData[parseInt(tempNumber)]["giam_gia"],
              name: getData[parseInt(tempNumber)]["name"]
            };
            items.push(tempItem);
            number = tempNumber;
            tempImg = []; // Reset tempImg for the new number
          }
        }
        if (number === tempNumber) {
          tempImg.push(img[i]);
        }
      }
      if (JSON.stringify(images) !== JSON.stringify(items)) {
        setImages(items);
      }
    }
  }, [data, img]); // Re-run when data or img changes
  console.log(images);
  return images;
}
