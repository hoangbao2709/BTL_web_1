import { each } from 'jquery';
import React, { useState, useEffect } from 'react';

export function Data(url) {  
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`https://localhost/book_store_web/src/components/app/BackEnd/php/uploads/getSearch.php?&url=${encodeURIComponent(url)}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [url]); 
  console.log(`https://localhost/book_store_web/src/components/app/BackEnd/php/uploads/getSearch.php?&url=${encodeURIComponent(url)}`);
  return data;
}
