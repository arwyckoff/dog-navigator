
import React, { useEffect, useState } from "react";
import fetchApiCall from '../api/api-util';

function ImgDisplay () {
    const [imageURL, setImage] = useState("");
    useEffect(() => {
      const fetchUserEmail = async () => {
        const response = await fetchApiCall<{ message: string }>('https://dog.ceo/api/breeds/image/random');
        const imageURL = response.message;
        setImage(imageURL);
      };
      fetchUserEmail();
    }, []);
  
    return (
      <div>
        <h1>A dog</h1>
        <img src={imageURL} alt="" />
      </div>
    );
  };

export default ImgDisplay;
