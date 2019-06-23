import React, { Component } from "react";
import "antd/dist/antd.css";
import Table from "antd/lib/table";
import "antd/lib/table/style/css";
import Divider from "antd/lib/divider";
import "antd/lib/divider/style/css";
import "../styling/PrescriptionTable";

const columns = [
  {
    title: "Prescription",
    dataIndex: "Prescription",
    render: text => <a href="javascript:;">{text}</a>
  },
  {
    title: "Strength",
    className: "column-money",
    dataIndex: "Strength"
  },
  {
    title: "Dose",
    dataIndex: "Dose"
  },
  {
    title: "Request Date",
    dataIndex: "RequestDate"
  },
  {
    title: "Status",
    dataIndex: "Status"
  },
  {
    title: "Action",
    dataIndex: "Action",
    render: () => {
      return (
        <span>
          <a href="javascript:;">Edit</a>
          <Divider type="vertical" />
          <a href="javascript:;">Delete</a>
        </span>
      );
    }
  }
];

const data = [
  {
    key: "1",
    Prescription: "Asprin",
    Strength: "50 mg",
    Dose: 2,
    RequestDate: "11/2019",
    Status: "Pending"
  }
];

class PrescriptionTable extends Component {
  render() {
    return (
        <div className="prescription-table" >
        <Table dataSource={data} columns={columns}/>
        </div>
    );
  }
}

export default PrescriptionTable;
