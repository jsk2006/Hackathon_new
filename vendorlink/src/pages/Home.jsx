import React from "react";
import Carousel from "../components/carousel";

const Home = () => {
  return (
    <div className="home-container">
      <section className="landing-section">
        <h1>Welcome to VendorLink</h1>
        <p>Connecting street food vendors with trusted suppliers, easily and efficiently.</p>
      </section>
      <section className="carousel-section">
        <Carousel />
      </section>
      <section className="features-section">
        <h2>What We Do</h2>
        <ul>
          <li>Find the best suppliers for your street food business</li>
          <li>Compare prices and products dynamically</li>
          <li>Easy order tracking and management</li>
          <li>Secure payments and order history</li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
