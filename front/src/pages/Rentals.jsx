import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";
import ReturnModal from "../components/ReturnModal";
import "../styles/pages/Rentals.css";

const Rentals = () => {
  const { authToken } = useContext(AuthContext);
  const [rentals, setRentals] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/rentals/user",
          {
            headers: {
              Authorization: `${authToken}`,
            },
          }
        );
        console.log(response.data.data);
        
        setRentals(response.data.data);
        setLoading(false);
      } catch (error) {
        setError("Error al obtener las rentas");
        setLoading(false);
      }
    };

    fetchRentals();
  }, [authToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="rentals">
      <h1 className="rentals__title">Mis alquileres</h1>
      {rentals.length === 0 ? (
        <p>No tienes alquileres activos.</p>
      ) : (
        <div className="rentals__list">
          {rentals.map((rental) => (
            <div key={rental.id} className="rental-card">
              <div className="rental-card__info">
                <h3 className="rental-card__name">{rental.item_reference
                }</h3>
                <p className="rental-card__ref">Ref: {rental.item_reference
                }</p>
                <p className="rental-card__dates">
                  Alquilado el: {new Date(rental.rental_date).toLocaleDateString()}
                  <br />
                  Fecha máxima de devolución:{" "}
                  {new Date(rental.due_date).toLocaleDateString()}
                </p>
              </div>
              {!rental.is_returned ? (
                <button
                  className="rental-card__return"
                  onClick={() => setSelectedItem(rental)}
                >
                  Devolver item
                </button>
              ):
              <p>Devuelto</p>}
            </div>
          ))}
        </div>
      )}
      {selectedItem && (
        <ReturnModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default Rentals;
