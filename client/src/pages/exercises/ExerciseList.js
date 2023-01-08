import React from "react";
import ExerciseCard from "../../components/ExerciseCard.js";
import '../../components/ExerciseCard.css'

function ExerciseList({ exercises }) {

  if (!exercises) {
    return <p>No exercises to display</p>;
  }

  return (
    <div className='card'>
      {exercises.map((exercise) => (
        <ExerciseCard
          key={exercise.id}
          name={exercise.name}
          description={exercise.description}
          sets={exercise.sets}
          reps={exercise.reps}
          image={exercise.image}
        />
      ))}
    </div>
  );
}

export default ExerciseList;



  // const [exercise, setExercise] = useState([]);

  // useEffect(() => {
  //   const getExerciseList = async () => {
  //     const res = await axios.get("http://localhost:8000/exercises");
  //     setExercise(res.data);
  //   };

  //   getExerciseList();
  // }, []);