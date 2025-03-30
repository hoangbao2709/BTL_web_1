import React, { useState, useEffect } from 'react';

export function Data(url, variable) {  
  const [data, setData] = useState([]);
  console.log(`https://localhost/BTL_web_1/src/components/app/BackEnd/php/uploads/getdata.php?&url=${encodeURIComponent(url)}&variable=${encodeURIComponent(variable)}`);

  useEffect(() => {
    fetch(`https://localhost/BTL_web_1/src/components/app/BackEnd/php/uploads/getdata.php?&url=${encodeURIComponent(url)}&variable=${encodeURIComponent(variable)}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [url, variable]); 
  return data;
}
