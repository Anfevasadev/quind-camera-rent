import '../styles/components/ReturnModal.css';

const ReturnModal = ({ item, onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle return logic here
    onClose();
  };

  return (
    <div className="return-modal">
      <div className="return-modal__content">
        <h2 className="return-modal__title">Devolver {item.name}</h2>
        <p className="return-modal__ref">Referencia: {item.reference}</p>
        
        <form onSubmit={handleSubmit} className="return-modal__form">
          <div className="form-group">
            <label htmlFor="pickupAddress">Dirección para recoger devolución:</label>
            <textarea
              id="pickupAddress"
              className="return-modal__input"
              required
              rows="3"
            />
          </div>
          
          <div className="return-modal__actions">
            <button 
              type="button" 
              onClick={onClose}
              className="return-modal__button return-modal__button--cancel"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="return-modal__button return-modal__button--confirm"
            >
              Confirmar devolución
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReturnModal;