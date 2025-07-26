import React from "react";
import Carousel1 from "../components/carousel1";

const Home = () => {
  return (
    <div className="home-container">
      <section className="landing-section">
        <h1>Welcome to VendorLink</h1>
        <p>
          The modern platform where <b>street food vendors</b> and <b>suppliers</b> connect, collaborate, and grow together. Find the best deals, track orders, and build lasting partnerships.
        </p>
      </section>

      <section className="carousel-section">
        <Carousel1 />
      </section>

      <section className="features-section">
        <h2>What We Do?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <img 
              src="https://images.unsplash.com/photo-1737743824207-6ac1f4ba47f3?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Indian Street Food Vendors" 
              className="feature-img"
            />
            <h3>For Vendors</h3>
            <p>Discover reliable suppliers, compare prices, and order raw materials with ease.</p>
          </div>
          <div className="feature-card">
            <img 
              src="https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?q=80&w=643&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://images.unsplash.com/photo-1530507629858-e4977d30e9e0?q=80&w=643&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Indian Farm" 
              className="feature-img"
            />
            <h3>For Suppliers</h3>
            <p>Connect with new vendors, showcase your products, and grow your business network.</p>
          </div>
          <div className="feature-card">
            <img 
              src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Indian Raw Materials" 
              className="feature-img"
            />
            <h3>Raw Materials</h3>
            <p>Access a wide range of ingredients and supplies at competitive prices.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works-section">
        <h2>How It Works?</h2>
        <div className="how-it-works-grid">
          <div className="how-step">
            <span className="step-number">1</span>
            <p>Vendors browse and connect with suppliers.</p>
          </div>
          <div className="how-step">
            <span className="step-number">2</span>
            <p>Suppliers showcase products and receive requests from vendors.</p>
          </div>
          <div className="how-step">
            <span className="step-number">3</span>
            <p>Both parties track orders, communicate, and grow their businesses together.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;