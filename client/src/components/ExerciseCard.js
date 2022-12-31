import React from "react";
import './ExerciseCard.css'
function ExerciseCard({ name, description, sets, reps, image }) {
  return (
    <div className='card'>
      <h2 className='card-title'>{name}</h2>
      <p className='card-description'>{description}</p>
      <p>Sets: {sets}</p>
      <p>Reps: {reps}</p>
      {image && <img src={image} alt={name} className='card__img' />}
    </div>
  );
}

export default ExerciseCard;
