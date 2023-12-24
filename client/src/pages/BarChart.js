
import * as React from "react";
import './Chart.css'
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

  const [isLoading, setIsLoading] = React.useState()
    const dataManager = new DataManager({
      url: `/exercises`,
    });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const response = await dataManager.executeQuery(new Query());


        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); 

  const primaryxAxis = { valueType: "Category", title: "Day of the Week" };
  const primaryyAxis = { title: "Reps and Sets" };

  return (
    <div className='chart-div'>
      {isLoading ? (
        <div className='spinner'></div>
      ) : (
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
