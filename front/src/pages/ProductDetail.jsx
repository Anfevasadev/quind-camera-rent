import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import ItemsCarousel from "../components/ItemsCarousel";
import CameraDetail from "../components/CameraDetail";
import FilmDetail from "../components/FilmDetail";
import camImg from "../assets/analog-cam-1.png";
import filmImg from "../assets/film-1.webp";
import ProductCarousel from "../components/ProductCarousel";
import "../styles/pages/ProductDetail.css";

const ProductDetail = () => {
  const { type, id } = useParams();
  const [product, setProduct] = useState(null);
  const [items, setItems] = useState([]);
  const [compatibility, setCompatibility] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/${type}s/${id}`);
        setProduct(response.data.data);
      } catch (error) {
        setError('Error fetching product data');
      }
    };

    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/items/');
        setItems(response.data.data.filter(item => item[`${type}_id`] === parseInt(id)));
      } catch (error) {
        setError('Error fetching items data');
      }
    };

    const fetchCompatibility = async () => {
      try {
        const oppositeType = type === 'camera' ? 'film' : 'camera';
        const response = await axios.get(`http://localhost:3000/api/compatibility/${oppositeType}/${id}`);
        setCompatibility(response.data.data);
      } catch (error) {
        setError('Error fetching compatibility data');
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchProduct(), fetchItems(), fetchCompatibility()]);
      setLoading(false);
    };

    fetchData();
  }, [type, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="product-detail">
      <div className="product-detail__main">
        <div className="product-detail__image-container">
          <img
            src={type === "camera" ? camImg : filmImg}
            alt={type === "camera" ? product?.model : product?.name}
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
        <ItemsCarousel items={items} />
      </div>
      <div className="product-detail__items">
        {type === "camera" ? (
          <ProductCarousel
            title="Películas compatibles"
            items={compatibility}
            type={"film"}
          />
        ) : (
          <ProductCarousel
            title="Cámaras compatibles"
            items={compatibility}
            type={"camera"}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
