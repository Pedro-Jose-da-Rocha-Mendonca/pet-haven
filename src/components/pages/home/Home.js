import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import "./Home.css";

const Home = () => {
  const [combinedImages, setCombinedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const [dogResponse, catResponse] = await Promise.all([
          fetch("https://dog.ceo/api/breeds/image/random/5"),
          fetch("https://api.thecatapi.com/v1/images/search?limit=5")
        ]);

        const dogData = await dogResponse.json();
        const catData = await catResponse.json();

        const allImages = [
          ...dogData.message,
          ...catData.map(cat => cat.url)
        ].sort(() => Math.random() - 0.5);

        setCombinedImages(allImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const timer = setInterval(() => {
        setActiveSlide((current) => 
          current === combinedImages.length - 1 ? 0 : current + 1
        );
      }, 3000);

      return () => clearInterval(timer);
    }
  }, [isLoading, combinedImages.length]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Welcome to Pet Haven</h1>
        <p>Your gateway to finding your new furry family member.</p>
      </header>

      <section className="carousel-container">
        {isLoading ? (
          <div>Loading images...</div>
        ) : (
          <div className="simple-slider" ref={sliderRef}>
            {combinedImages.map((image, index) => (
              <div 
                className={`slide ${index === activeSlide ? 'active' : ''}`} 
                key={index}
              >
                <img
                  src={image}
                  alt={`Pet ${index + 1}`}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="home-sections-container">
        <div className="home-sections">
          <div className="home-card">
            <h2>Adopt</h2>
            <p>
              Find your perfect companion from our collection of pets waiting for
              a forever home.
            </p>
            <button onClick={() => handleNavigation('/adopt')}>
              View Pets
            </button>
          </div>
          <div className="home-card">
            <h2>Learn</h2>
            <p>Discover resources on pet care, adoption processes, and more.</p>
            <button onClick={() => handleNavigation('/learn')}>
              Learn More
            </button>
          </div>
          <div className="home-card">
            <h2>Help</h2>
            <p>Support our mission by volunteering, fostering, or donating.</p>
            <button onClick={() => handleNavigation('/help')}>
              Get Involved
            </button>
          </div>
          <div className="home-card">
            <h2>About Us</h2>
            <p>
              Learn about our mission to connect loving homes with pets in need.
            </p>
            <button onClick={() => handleNavigation('/about')}>
              About Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
