import * as React from "react";
import "./Chart.css";
import dummy from "../data/dummy.js";
import {
  Category,
  ChartComponent,
  ColumnSeries,
  Inject,
  Legend,
  SeriesCollectionDirective,
  SeriesDirective,
} from "@syncfusion/ej2-react-charts";

function BarChart({ chartData }) {
  const primaryxAxis = { valueType: "Category", title: "Day of the Week" };
  const primaryyAxis = { title: "Reps and Sets" };

  return (
    <div className='chart-div'>
      <ChartComponent
        id='workoutChart'
        primaryXAxis={primaryxAxis}
        primaryYAxis={primaryyAxis}
      >
        <Inject services={[ColumnSeries, Legend, Category]} />
        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={chartData}
            xName='dayOfWeek'
            yName='reps'
            type='Column'
            name='Reps'
          />
          <SeriesDirective
            dataSource={chartData}
            xName='dayOfWeek'
            yName='sets'
            type='Column'
            name='Sets'
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
}

export default BarChart;
