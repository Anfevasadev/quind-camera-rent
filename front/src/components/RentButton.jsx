import { useState } from "react";
import RentModal from "./RentModal";
import "../styles/components/RentButton.css";

const RentButton = ({ itemReference }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button className="rent-button" onClick={() => setIsModalOpen(true)}>
        Alquilar ahora
      </button>
      {isModalOpen && (
        <RentModal
          itemReference={itemReference}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default RentButton;
