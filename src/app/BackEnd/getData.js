import React, { useState, useEffect } from 'react';

export function Data(url) {  
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`https://localhost/BTL_web_1/src/app/BackEnd/php/uploads/${url}.php`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      // .catch((error) => {
      //   console.error("Error fetching data: ", error);
      //   alert("An error occurred while fetching data. Please check the console for more details.");
      // });
  }, []);

  return data;
}