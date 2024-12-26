import RentButton from './RentButton';
import '../styles/components/ItemsCarousel.css';

const ItemsCarousel = ({ items }) => {
  return (
    <div className="items-carousel">
      {items.map((item) => (
        <div key={item.reference} className="items-carousel__item">
          <span className="items-carousel__reference">
            Ref: {item.reference}
          </span>
          <span className={`items-carousel__status items-carousel__status--${item.status}`}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </span>
          {item.availability_date && (
            <span className="items-carousel__date">
              Available: {new Date(item.availability_date).toLocaleDateString()}
            </span>
          )}
          {item.status === 'available' && (
            <RentButton reference={item.reference} />
          )}
        </div>
      ))}
    </div>
  );
}

export default ItemsCarousel;