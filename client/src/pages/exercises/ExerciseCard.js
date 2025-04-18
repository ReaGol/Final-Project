import React, { useState } from "react";
import ExerciseModal from "./ExerciseDetails.js";
import "./ExerciseCard.css";



function ExerciseCard({ name, description, sets, reps, image, id }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);


  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className='exercise-card'>
      <h2 className='card-title'>{name}</h2>
      <p className='card-description'>{description}</p>
      <p>Sets: {sets}</p>
      <p>Reps: {reps}</p>
      {image && <img src={image} alt={name} className='card__img' />}

      <button className='exercise-card-btn' onClick={openModal}>
        Exercise Details
      </button>

      <ExerciseModal
        isOpen={modalIsOpen}
        exercise={{
          name,
          description,
          sets,
          reps,
          image,
        }}
        onRequestClose={closeModal}
      />
    </div>
  );
}

export default ExerciseCard;
