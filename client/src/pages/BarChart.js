import * as React from "react";
import "./Chart.css";
import { DataManager, Query } from "@syncfusion/ej2-data";
import {
  Category,
  ChartComponent,
  ColumnSeries,
  Inject,
  Legend,
  LineSeries,
  SeriesCollectionDirective,
  SeriesDirective,
} from "@syncfusion/ej2-react-charts";
import { useStateContext } from "../contexts/ContextProvider";

function BarChart() {
  const [isLoading, setIsLoading] = React.useState(true);

  const dataManager = new DataManager({
    url: `/exercises`,
  });

  // Assuming you have a useEffect to fetch data
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Set loading to true when starting to fetch data
        setIsLoading(true);

        // Fetch data using dataManager
        const response = await dataManager.executeQuery(new Query());

        // Handle the fetched data as needed

        // Set loading to false after data is loaded
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        // Handle error
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const primaryxAxis = { valueType: "Category", title: "Day of the Week" };
  const primaryyAxis = { title: "Reps and Sets" };

  return (
    <div className='chart-div'>
      {isLoading ? (
        // Render a spinner or loading indicator while data is being fetched
        <div className='spinner'></div>
      ) : (
        // Render the chart when data is loaded
        <ChartComponent
          id='workoutChart'
          primaryXAxis={primaryxAxis}
          primaryYAxis={primaryyAxis}
        >
          <Inject services={[ColumnSeries, Legend, Category]} />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={dataManager}
              xName='dayOfWeek'
              type='Column'
              yName='reps'
              name='Reps'
            />
            <SeriesDirective
              dataSource={dataManager}
              xName='dayOfWeek'
              type='Column'
              yName='sets'
              name='Sets'
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      )}
    </div>
  );
}

export default BarChart;
