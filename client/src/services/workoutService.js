import axios from "axios";

export const saveWorkout = async (userId, workout) => {
    try {
        const response = await axios.patch(
          `http://localhost:8000/therapist/patients/edit/${userId}`,
          {workout, workoutId: workout._id},
          
        );
        return response.data;
    }
    catch (error) {
          console.error("שמירת האימון נכשלה:", error);
          alert("לא הצלחנו לשמור את האימון. נסה שוב מאוחר יותר.");
    }
}

export const getChartDataFromExercises = (exercises = []) => {
  return exercises.map((ex) => {
    const date = new Date(ex.date);
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });

    return {
      dayOfWeek,
      reps: ex.repsCompleted || 0,
      sets: ex.setsCompleted || 0,
    };
  });
};
