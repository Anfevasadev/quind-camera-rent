import { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';
import '../styles/components/RentModal.css';

const RentModal = ({ itemReference, onClose }) => {

  const { authToken } = useContext(AuthContext);
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setAddress(e.target.value);
    if (error) {
      setError(null);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log({ itemReference, address });
      
      const response = await axios.post(
        'http://localhost:3000/api/rentals/rent',
        { itemReference, address },
        {
          headers: {
            Authorization: `${authToken}`,
          },
        }
      );
      onClose(); // Close the modal on success
    } catch (error) {
      console.log(error.response?.data);
    
      setError(error.response?.data?.error || 'Error al alquilar el item');
    }
  };

  return (
    <div className="rent-modal">
      <div className="rent-modal__content">
        <h2 className="rent-modal__title">Alquilar item {itemReference}</h2>
        <form onSubmit={handleSubmit} className="rent-modal__form">
          <div className="rent-modal__field">
            <label htmlFor="address" className="rent-modal__label">
              Dirección de entrega:
            </label>
            <textarea
              id="address"
              className="rent-modal__input"
              required
              rows="3"
              value={address}
              onChange={handleChange}
            />
          </div>
          {error && <div className="rent-modal__error">{error}</div>}
          <div className="rent-modal__actions">
            <button type="button" onClick={onClose} className="rent-modal__button rent-modal__button--cancel">
              Cancelar
            </button>
            <button type="submit" className="rent-modal__button rent-modal__button--confirm">
              Confirmar alquiler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RentModal;