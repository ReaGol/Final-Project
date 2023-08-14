import React from "react";
import { Link } from "react-router-dom"; 
//import '../exercises/ExerciseCard.css'

function ExerciseCard({ name, description, sets, reps, image, id}) {
  
  return (
    <div className='card'>
      <h2 className='card-title'>{name}</h2>
      <p className='card-description'>{description}</p>
      <p>Sets: {sets}</p>
      <p>Reps: {reps}</p>
      {image && <img src={image} alt={name} className='card__img' />}

      <Link to={`exercise/${id}`}>
        <button>Exercise Details</button>
      </Link>
    </div>
  );
}

export default ExerciseCard;
