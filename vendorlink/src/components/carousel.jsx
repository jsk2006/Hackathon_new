import React, { useState } from "react";

const slides = [
  {
    title: "Connect with Trusted Suppliers",
    desc: "Browse and find the best suppliers for your street food business."
  },
  {
    title: "Track Orders Easily",
    desc: "Keep track of your orders and manage your business efficiently."
  },
  {
    title: "Compare Prices Dynamically",
    desc: "See real-time market and wholesale prices to make informed decisions."
  }
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((current + 1) % slides.length);
  const prevSlide = () => setCurrent((current - 1 + slides.length) % slides.length);

  return (
    <div className="carousel">
      <button onClick={prevSlide}>&lt;</button>
      <div className="carousel-slide">
        <h3>{slides[current].title}</h3>
        <p>{slides[current].desc}</p>
      </div>
      <button onClick={nextSlide}>&gt;</button>
    </div>
  );
};

export default Carousel;
