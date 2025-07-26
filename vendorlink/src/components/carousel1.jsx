import React, { useState, useEffect } from "react";

const slides = [
  {
    title: "Connect with Trusted Suppliers and Street Food Vendors",
    desc: "Browse and find the best suppliers for your street food business.",
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Track Orders Easily",
    desc: "Keep track of your orders and manage your business efficiently.",
    img: "https://images.unsplash.com/photo-1647427017067-8f33ccbae493?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Compare Prices Dynamically",
    desc: "See real-time market and wholesale prices to make informed decisions.",
    img: "https://images.unsplash.com/photo-1669881336715-5a51a78d5434?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => setCurrent((current + 1) % slides.length);
  const prevSlide = () => setCurrent((current - 1 + slides.length) % slides.length);

  // Auto-slide functionality
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        nextSlide();
      }, 4000); // Change slide every 4 seconds

      return () => clearInterval(interval);
    }
  }, [current, isPaused]);

  return (
    <div 
      className="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <button onClick={prevSlide}>‹</button>
      <div className="carousel-slide">
        <img src={slides[current].img} alt={slides[current].title} className="carousel-img" />
        <h3>{slides[current].title}</h3>
        <p>{slides[current].desc}</p>
      </div>
      <button onClick={nextSlide}>›</button>
    </div>
  );
};

export default Carousel;