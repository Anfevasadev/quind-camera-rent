import '../styles/components/ProductDetail.css';

const CameraDetail = ({ camera }) => {
  return (
    <div className="product-info">
      <h1 className="product-info__title">{camera.model}</h1>
      <div className="product-info__details">
        <p className="product-info__brand">Marca: {camera.brand_name}</p>
        <p className="product-info__feature">
          Soporte flash: {camera.has_flash ? 'Sí' : 'No'}
        </p>
        <div className="product-info__service">
          <h3 className="product-info__service-title">Dirección servicio de reparación</h3>
          <p className="product-info__service-address">{camera.brand_service_address}</p>
        </div>
      </div>
    </div>
  );
}

export default CameraDetail;