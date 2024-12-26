import '../styles/components/RentModal.css';

const RentModal = ({ reference, onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle rental submission
    onClose();
  };

  return (
    <div className="rent-modal">
      <div className="rent-modal__content">
        <h2 className="rent-modal__title">Rent Item {reference}</h2>
        <form onSubmit={handleSubmit} className="rent-modal__form">
          <div className="rent-modal__field">
            <label htmlFor="address" className="rent-modal__label">
              Delivery Address
            </label>
            <textarea
              id="address"
              className="rent-modal__input"
              required
              rows="3"
            />
          </div>
          <div className="rent-modal__actions">
            <button type="button" onClick={onClose} className="rent-modal__button rent-modal__button--cancel">
              Cancel
            </button>
            <button type="submit" className="rent-modal__button rent-modal__button--confirm">
              Confirm Rental
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RentModal;