import RentButton from './RentButton';
import '../styles/components/ItemsCarousel.css';

const ItemsCarousel = ({ items }) => {
  
  return (
    <div className="items-carousel">
      {items?.map((item) => (
        <div key={item.reference} className="items-carousel__item">
          <span className="items-carousel__reference">
            Ref: {item.reference}
          </span>
          <span className={`items-carousel__status items-carousel__status--${item.state}`}>
            {item.state.charAt(0).toUpperCase() + item.state.slice(1)}
          </span>
          {item.due_date && (
            <span className="items-carousel__date">
              Available: {new Date(item.due_date).toLocaleDateString()}
            </span>
          )}
          {item.state === 'available' && (
            <RentButton itemReference={item.reference} />
          )}
        </div>
      ))}
    </div>
  );
}

export default ItemsCarousel;