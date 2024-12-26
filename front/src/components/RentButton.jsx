import { useState } from 'react';
import RentModal from './RentModal';
import '../styles/components/RentButton.css';

const RentButton = ({ reference }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button 
        className="rent-button"
        onClick={() => setIsModalOpen(true)}
      >
        Rent Now
      </button>
      {isModalOpen && (
        <RentModal 
          reference={reference}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default RentButton;