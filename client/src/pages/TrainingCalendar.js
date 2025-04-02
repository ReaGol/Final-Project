import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  Month,
  Inject,
} from "@syncfusion/ej2-react-schedule";

function TrainingCalendar({ trainingDays }) {
  const { id } = useParams();
  const [selectedDay, setSelectedDay] = useState(null);
  const [assignedExercises, setAssignedExercises] = useState([]);

//   const useGetWorkoutDetails = (selectedDate, setAssignedExercises) => {
    useEffect(() => {
      const fetchAssignedExercises = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/therapist/patients/${id}`
          );
          const userExercises = response.data.exercises;
          setAssignedExercises(userExercises);
          console.log(userExercises);
        } catch (error) {
          console.log(error);
        }
      };

      fetchAssignedExercises();
    }, [id, setAssignedExercises]);

    // return "Workout details for " + selectedDate.toDateString();
//   };

  const handlePopupOpen = (args) => {
    if (args.type === "QuickInfo" && selectedDay) {
    //   const details = useGetWorkoutDetails(selectedDay, setAssignedExercises);

    //   console.log(details);
    }
  };

  const handleDayClick = (args) => {
    setSelectedDay(args.startTime || null);
  };

  const events = trainingDays.map((day) => ({
    Subject: "Training Day",
    StartTime: day,
    EndTime: day,
  }));

  return (
    <ScheduleComponent
      currentView='Month'
      eventSettings={{ dataSource: events }}
      popupOpen={handlePopupOpen}
      selectedDate={selectedDay}
      eventClick={handleDayClick}
    >
      <ViewsDirective>
        <ViewDirective option='Day' />
        <ViewDirective option='Week' />
        <ViewDirective option='Month' />
      </ViewsDirective>
      <Inject services={[Day, Week, Month]} />
    </ScheduleComponent>
  );
}

export default TrainingCalendar;
