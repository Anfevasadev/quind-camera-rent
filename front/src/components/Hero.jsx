import { Link } from "react-router-dom";
import HeroCamImg from "../assets/vintage-cam.png";
import "../styles/components/Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__content">
        <h1 className="hero__title">Descubre la fotografía analógica</h1>
        <p className="hero__subtitle">
          Alquile cámaras y películas de alta calidad para su próxima aventura
          fotográfica
        </p>
        <a href="#catalog" className="hero__cta">
          Explora nuestro catálogo
        </a>
      </div>
      <div className="hero__image">
        <img src={HeroCamImg} alt="Vintage camera" className="hero__img" />
      </div>
    </section>
  );
};

export default Hero;
