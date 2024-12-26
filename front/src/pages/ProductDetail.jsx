import { useParams } from "react-router-dom";
import ItemsCarousel from "../components/ItemsCarousel";
import CameraDetail from "../components/CameraDetail";
import FilmDetail from "../components/FilmDetail";
import camImg from "../assets/analog-cam-1.png";
import filmImg from "../assets/film-1.webp";
import "../styles/pages/ProductDetail.css";
import ProductCarousel from "../components/ProductCarousel";

const ProductDetail = () => {
  const { type, id } = useParams();

  const compatibleFilms = [
    { id: 1, name: "Portra 400", brand: "Kodak", available: true },
    { id: 2, name: "HP5 Plus", brand: "Ilford", available: true },
    { id: 3, name: "Gold 200", brand: "Kodak", available: false },
  ];

  const compatibleCameras = [
    { id: 1, name: "Canon AE-1", brand: "Canon", available: true },
    { id: 2, name: "Pentax K1000", brand: "Pentax", available: true },
    { id: 3, name: "Nikon FM2", brand: "Nikon", available: false },
  ];

  const product =
    type === "camera"
      ? {
          id: 1,
          model: "Canon AE-1",
          has_flash: true,
          brand_name: "Canon",
          brand_service_address: "123 Camera Service St, NY",
          image: camImg,
          items: [
            {
              reference: "CAE1-001",
              status: "available",
              availability_date: null,
            },
            {
              reference: "CAE1-002",
              status: "rented",
              availability_date: "2024-04-01",
            },
            {
              reference: "CAE1-003",
              status: "repair",
              availability_date: "2024-03-25",
            },
          ],
        }
      : {
          id: 1,
          name: "Portra 400",
          iso: 400,
          format: "35mm",
          brand_name: "Kodak",
          brand_service_address: "456 Film Lab Ave, LA",
          image: filmImg,
          items: [
            {
              reference: "KP400-001",
              status: "available",
              availability_date: null,
            },
            {
              reference: "KP400-002",
              status: "rented",
              availability_date: "2024-03-30",
            },
          ],
        };

  return (
    <div className="product-detail">
      <div className="product-detail__main">
        <div className="product-detail__image-container">
          <img
            src={product.image}
            alt={type === "camera" ? product.model : product.name}
            className="product-detail__image"
          />
        </div>
        <div className="product-detail__info">
          {type === "camera" ? (
            <CameraDetail camera={product} />
          ) : (
            <FilmDetail film={product} />
          )}
        </div>
      </div>
      <div className="product-detail__items">
        <h2 className="product-detail__items-title">Items en stock</h2>
        <ItemsCarousel items={product.items} />
      </div>
      <div className="product-detail__items">
        {type === "camera" ? (
          <ProductCarousel
            title="Películas compatibles"
            items={compatibleFilms}
            type={"film"}
          />
        ) : (
          <ProductCarousel
            title="Cámaras compatibles"
            items={compatibleCameras}
            type={"camera"}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
