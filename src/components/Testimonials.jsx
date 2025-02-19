// Install dependencies before using:
// npm install swiper react-swiper tailwindcss

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "Web Developer",
    testimonial:
      "This platform has completely transformed the way I approach microtasks. It's efficient and reliable!",
    image: "https://i.ibb.co.com/WysRqb3/3.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Graphic Designer",
    testimonial:
      "I love how intuitive and user-friendly this platform is. Highly recommend!",
    image: "https://i.ibb.co.com/nk0d9xF/2.jpg",
  },
  {
    id: 3,
    name: "Sam Wilson",
    role: "Content Writer",
    testimonial:
      "Earning while working on what I enjoy has been a game-changer. Excellent service!",
    image: "https://i.ibb.co.com/bWx9BxZ/pexels-1000hk-1496647.jpg",
  },
];

export const Testimonials = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation
          className="mySwiper">
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <p className="text-lg italic mb-4">
                  "{testimonial.testimonial}"
                </p>
                <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                <p className="text-gray-500">{testimonial.role}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
