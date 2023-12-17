import React from "react";
import './Kanban.css'
import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-kanban";

import { kanbanData, kanbanGrid } from "../data/dummy";
// import { Header } from "../components";

const Kanban = () => (
  <div className="kanban-container">
    {/* <Header category='App' title='Kanban' /> */}
    <KanbanComponent
      id='kanban'
      keyField='Status'
      dataSource={kanbanData}
      cardSettings={{ contentField: "Summary", headerField: "Id" }}
    >
      <ColumnsDirective>
        {kanbanGrid.map((item, index) => (
          <ColumnDirective key={index} {...item} />
        ))}
      </ColumnsDirective>
    </KanbanComponent>
  </div>
);

export default Kanban;
