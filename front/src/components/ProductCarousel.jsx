import { useNavigate } from "react-router-dom";
import imgCam1 from "../assets/analog-cam-1.png";
import imgCam2 from "../assets/analog-cam-2.png";
import imgCam3 from "../assets/analog-cam-3.png";
import imgFilm1 from "../assets/film-1.webp";
import imgFilm2 from "../assets/film-2.webp";
import imgFilm3 from "../assets/film-3.jpg";
import "../styles/components/ProductCarousel.css";

const cameras = [imgCam1, imgCam2, imgCam3];
const films = [imgFilm1, imgFilm2, imgFilm3];

const ProductCarousel = ({ title, items, type }) => {
  const navigate = useNavigate();

  const handleCardClick = (item) => {
    navigate(`/${type}/${item.id}`);
  };

  const randomImage = () => {
    console.log("Type", type);
    
    if (type === "camera") {
      return cameras[Math.floor(Math.random() * cameras.length)];
    } else {
      return films[Math.floor(Math.random() * films.length)];
    }
  };

  return (
    <section className="carousel">
      <h2 className="carousel__title">{title}</h2>
      <div className="carousel__container">
        {items.map((item) => (
          <div
            key={item.id}
            className="carousel__item"
            onClick={() => handleCardClick(item)}
            role="button"
            tabIndex={0}
          >
            <img
              src={randomImage()}
              alt={item.name}
              className="carousel__image"
            />
            <h3 className="carousel__item-title">{item.name}</h3>
            <p className="carousel__brand">{item.brand}</p>
            <span
              className={`carousel__status ${
                item.available
                  ? "carousel__status--available"
                  : "carousel__status--unavailable"
              }`}
            >
              {item.available ? "Available" : "Unavailable"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCarousel;