import { useState } from 'react';
import ReturnModal from '../components/ReturnModal';
import '../styles/pages/Rentals.css';

const Rentals = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Mock data - replace with actual data from the API
  const rentals = [
    {
      id: 1,
      reference: 'CAE1-001',
      type: 'camera',
      name: 'Canon AE-1',
      rentDate: '2024-03-15',
      returnDate: '2024-03-22',
      status: 'active'
    },
  ];

  return (
    <div className="rentals">
      <h1 className="rentals__title">Mis alquileres</h1>
      <div className="rentals__list">
        {rentals.map(rental => (
          <div key={rental.id} className="rental-card">
            <div className="rental-card__info">
              <h3 className="rental-card__name">{rental.name}</h3>
              <p className="rental-card__ref">Ref: {rental.reference}</p>
              <p className="rental-card__dates">
                Alquilado el: {new Date(rental.rentDate).toLocaleDateString()}
                <br />
                Fecha máxima de devolución: {new Date(rental.returnDate).toLocaleDateString()}
              </p>
            </div>
            {rental.status === 'active' && (
              <button 
                className="rental-card__return"
                onClick={() => setSelectedItem(rental)}
              >
                Devolver item
              </button>
            )}
          </div>
        ))}
      </div>
      
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