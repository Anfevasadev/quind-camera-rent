import '../styles/components/ProductDetail.css';

const FilmDetail = ({ film }) => {
  return (
    <div className="product-info">
      <h1 className="product-info__title">{film.name}</h1>
      <div className="product-info__details">
        <p className="product-info__brand">Brand: {film.brand_name}</p>
        <p className="product-info__feature">ISO: {film.iso}</p>
        <p className="product-info__feature">Format: {film.format}</p>
        <div className="product-info__service">
          <h3 className="product-info__service-title">Service Center</h3>
          <p className="product-info__service-address">{film.brand_service_address}</p>
        </div>
      </div>
    </div>
  );
}

export default FilmDetail;