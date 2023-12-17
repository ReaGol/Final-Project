import {useState} from "react";
import './Calendar.css'

import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  Resize,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { scheduleData } from "../data/dummy";
// import {Header} from "../components";
const PropertyPane = (props) => <div className='mt-5'>{props.children}</div>;

function Calendar() {
    const [scheduleObj, setScheduleObj] = useState();

      const change = (args) => {
        scheduleObj.selectedDate = args.value;
        scheduleObj.dataBind();
      };

      const onDragStart = (arg) => {
        arg.navigation.enable = true;
      };
  return (
    <div className='calendar-div'>
      {/* <Header category='App' title='Calendar' />{" "} */}
      <ScheduleComponent
        height='650px'
        ref={(schedule) => setScheduleObj(schedule)}
        selectedDate={new Date(2021, 0, 10)}
        eventSettings={{ dataSource: scheduleData }}
        dragStart={onDragStart}
      >
        <ViewsDirective>
          {["Day", "Week", "WorkWeek", "Month", "Agenda"].map((item) => (
            <ViewDirective key={item} option={item} />
          ))}
        </ViewsDirective>
        <Inject
          services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]}
        />
      </ScheduleComponent>
    </div>
  );
}

export default Calendar;
