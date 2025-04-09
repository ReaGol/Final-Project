import axios from "axios";
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './AddExercise.css'

function AddExercise() {
     const [exercise, setExercise] = useState({
       exerciseName: "",
       description: "",
       reps: "",
       sets: "",
       duration: "",
       completed: "",
       notes: "",
       image: "",
     });
       const navigate = useNavigate();

         const saveExercise = async (e) => {
           console.log(e);
           e.preventDefault();
           try {
             console.log(`saving exercise ${JSON.stringify(exercise)}`);
             await axios.post("http://localhost:8000/exercises", exercise);
             navigate("/exercises");
           } catch (error) {
             console.log(error);
           }
         };

   return (
     <div className='add-exercise-form-container'>
       <form onSubmit={saveExercise} action='submit'>
         <div className='add-exercise-input-container'>
           <label htmlFor=''>Enter Exercise Name</label>
           <br />
           <input
             onChange={(e) =>
               setExercise({ ...exercise, exerciseName: e.target.value })
             }
             type='text'
             placeholder='exercise name'
           />
         </div>
         <div className='add-exercise-input-container'>
           <label htmlFor=''>Enter Description</label>
           <br />
           <input
             value={exercise.description}
             onChange={(e) =>
               setExercise({ ...exercise, description: e.target.value })
             }
             type='text'
             placeholder='description'
           />
         </div>
         <div className='add-exercise-input-container'>
           <label htmlFor=''>Enter Reps</label>
           <br />
           <input
             value={exercise.reps}
             onChange={(e) =>
               setExercise({ ...exercise, reps: e.target.value })
             }
             type='text'
             placeholder='reps'
           />
         </div>
         <div className='add-exercise-input-container'>
           <label htmlFor=''>Enter Sets</label>
           <br />
           <input
             value={exercise.sets}
             onChange={(e) =>
               setExercise({ ...exercise, sets: e.target.value })
             }
             type='text'
             placeholder='sets'
           />
         </div>
         <div className='add-exercise-input-container'>
           <label htmlFor=''>Enter Duration</label>
           <br />
           <input
             value={exercise.duration}
             onChange={(e) =>
               setExercise({ ...exercise, duration: e.target.value })
             }
             type='text'
             placeholder='duration'
           />
         </div>
         <div className='add-exercise-input-container'>
           <label htmlFor=''>Notes</label>
           <br />
           <textarea
             className='add-exercise-textarea'
             value={exercise.notes}
             onChange={(e) =>
               setExercise({ ...exercise, notes: e.target.value })
             }
             type='text'
             placeholder='notes'
           />
         </div>
         <div className="buttons">
           <input className='add-exercise-btn' type='submit' value='Create' />
           <Link to='/' className='add-exercise-btn'>
             <i className='fa-solid fa-arrow-left-long'></i>
           </Link>
         </div>
       </form>
     </div>
   );
}

export default AddExercise;




 




 

