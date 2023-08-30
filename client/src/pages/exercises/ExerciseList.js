import React from "react";
import { Link } from "react-router-dom";
import ExerciseCard from "./ExerciseCard";
import './ExerciseList.css'

function ExerciseList({ exercises }) {

  if (!exercises) {
    return <p>No exercises to display</p>;
  }
  return (
    <div className='wrapper2'>
      {exercises?.map((exercise) => (
        <ExerciseCard
          key={exercise._id}
          id={exercise._id}
          name={exercise.name}
          description={exercise.description}
          sets={exercise.sets}
          reps={exercise.reps}
          image={exercise.image}
        />
      ))}
      <Link to='/'>
        <button>Back</button>
      </Link>
    </div>
  );
}

export default ExerciseList;
