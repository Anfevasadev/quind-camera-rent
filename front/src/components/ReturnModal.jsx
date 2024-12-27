import React, { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";
import "../styles/components/ReturnModal.css";

const ReturnModal = ({ item, onClose }) => {
  const { authToken } = useContext(AuthContext);
  const [pickupAddress, setPickupAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setPickupAddress(e.target.value);
    if (error) {
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/rentals/return",
        { itemReference: item.item_reference, pickupAddress },
        {
          headers: {
            Authorization: `${authToken}`,
          },
        }
      );
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.log(error.response?.data);

      setError(error.response?.data?.error || "Error al devolver el item");
      setLoading(false);
    }
  };

  return (
    <div className="return-modal">
      <div className="return-modal__content">
        <h2 className="return-modal__title">Devolver {item.item_reference}</h2>
        <p className="return-modal__ref">Referencia: {item.item_reference}</p>

        <form onSubmit={handleSubmit} className="return-modal__form">
          <div className="form-group">
            <label htmlFor="pickupAddress">
              Dirección para recoger devolución:
            </label>
            <textarea
              id="pickupAddress"
              className="return-modal__input"
              required
              rows="3"
              value={pickupAddress}
              onChange={handleChange}
            />
          </div>
          {error && <div className="return-modal__error">{error}</div>}
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
              disabled={loading}
            >
              {loading ? "Procesando..." : "Confirmar devolución"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReturnModal;
