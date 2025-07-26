import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    title: "Fresh Vegetables",
    desc: "Get fresh vegetables delivered to your doorstep",
    icon: "🥬",
    color: "#28a745",
    link: "/dynamic-price?category=vegetables"
  },
  {
    title: "Quality Meat",
    desc: "Premium quality meat from trusted suppliers",
    icon: "🍗",
    color: "#dc3545",
    link: "/dynamic-price?category=meat"
  },
  {
    title: "Fresh Fruits",
    desc: "Sweet and fresh fruits for your business",
    icon: "🍎",
    color: "#fd7e14",
    link: "/dynamic-price?category=fruits"
  },
  {
    title: "Grains & Cereals",
    desc: "Essential grains and cereals for daily cooking",
    icon: "🌾",
    color: "#ffc107",
    link: "/dynamic-price?category=grains"
  },
  {
    title: "Cooking Essentials",
    desc: "Oils, spices, and cooking essentials",
    icon: "🛢️",
    color: "#6f42c1",
    link: "/dynamic-price?category=oils"
  }
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((current + 1) % slides.length);
  const prevSlide = () => setCurrent((current - 1 + slides.length) % slides.length);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(timer);
  }, [current]);

  return (
    <div className="carousel-container">
    <div className="carousel">
        <button className="carousel-btn prev" onClick={prevSlide}>
          ‹
        </button>
        
        <div className="carousel-slides">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === current ? 'active' : ''}`}
              style={{
                transform: `translateX(${(index - current) * 100}%)`,
                backgroundColor: slide.color
              }}
            >
              <div className="slide-content">
                <div className="slide-icon">{slide.icon}</div>
                <h3>{slide.title}</h3>
                <p>{slide.desc}</p>
                <Link to={slide.link} className="slide-btn">
                  Explore {slide.title}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-btn next" onClick={nextSlide}>
          ›
        </button>
      </div>

      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === current ? 'active' : ''}`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
