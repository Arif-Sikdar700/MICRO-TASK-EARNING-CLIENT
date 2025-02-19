import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import image2 from "../assets/thumbail/2.png";
import image3 from "../assets/thumbail/3.png";
import image4 from "../assets/thumbail/4.png";
import image5 from "../assets/thumbail/5.png";
import image6 from "../assets/thumbail/6.png";

export default function Carosel() {
  return (
    <Carousel showArrows={true} autoPlay={true} infiniteLoop={true}>
      <div>
        <img src={image2} />
      </div>
      <div>
        <img src={image3} />
      </div>
      <div>
        <img src={image4} />
      </div>
      <div>
        <img src={image5} />
      </div>
      <div>
        <img src={image6} />
      </div>
    </Carousel>
  );
}
