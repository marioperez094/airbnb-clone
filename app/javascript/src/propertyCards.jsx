import React from "react";
import ImageSlider from "./imageSlider";

const PropertyCards = (props) => {
  const { link, property } = props;
  const { title, price_per_night, city, country, images } = property;

  return (
    <div className="col-6 col-lg-4 mb-4 property-home">
        <ImageSlider images={images} />
      <a href={link} className="text-body text-decoration-none">
        <p className="text-uppercase mb-0 text-secondary"><small><b>{city}, {country}</b></small></p>
        <h6 className="mb-0">{title}</h6>
        <p className="mb-0"><small>${price_per_night} USD/night</small></p>
      </a>  
    </div>
  )
};

export default PropertyCards;