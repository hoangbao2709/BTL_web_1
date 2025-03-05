import React, { useState, useEffect } from 'react';

export function useData(img = []) {  
  const [data, setData] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('https://localhost/BTL_web_1/src/app/BackEnd/php/uploads/index.php')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        alert("An error occurred while fetching data. Please check the console for more details.");
      });
  }, []);

  useEffect(() => {
    if (data.length > 0 && img.length > 0) { // Kiểm tra img.length
      const getData = {};
      data.forEach((element) => {
        getData[element.id] = element;
      });

      let items = [];
      let number = "";
      let tempImg = [];

      for (let i = 0; i < img.length; i++) {
        const fileName = img[i].split('/').pop();
        const tempNumber = fileName.split('_')[0];

        if (number !== tempNumber) {
          if (getData[parseInt(tempNumber)]) {
            if (tempImg.length > 0) { 
              let tempItem = {
                img: tempImg,
                gia_goc: getData[parseInt(tempNumber)]["gia_goc"],
                gia: getData[parseInt(tempNumber)]["gia"],
                giam_gia: getData[parseInt(tempNumber)]["giam_gia"],
                name: getData[parseInt(tempNumber)]["name"]
              };
              items.push(tempItem);
              tempImg = []; 
            }
            number = tempNumber; 
          }
        }
        tempImg.push(img[i]); 
      }

      if (tempImg.length > 0 && getData[parseInt(number)]) {
        let tempItem = {
          img: tempImg,
          gia_goc: getData[parseInt(number)]["gia_goc"],
          gia: getData[parseInt(number)]["gia"],
          giam_gia: getData[parseInt(number)]["giam_gia"],
          name: getData[parseInt(number)]["name"]
        };
        items.push(tempItem);
      }

      if (JSON.stringify(images) !== JSON.stringify(items)) {
        setImages(items);
      }
    }
  }, [data, img]); 
  return images;
}