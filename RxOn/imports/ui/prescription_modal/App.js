import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { show } from "redux-modal";
import AntdModal from "./PrescriptionModal";
import PrescriptionTable from "./PrescriptionTable";
import Button from "antd/lib/button";
import "../styling/PrescriptionTable";

class App extends Component {
  handleOpen = name => () => {
    this.props.show(name, { message: "Pop up for adding new prescription" });
  };

  render() {
    return (
      <div className="prescription-page">
        <PrescriptionTable />
        <br />
        <p>
          <Button type="primary" onClick={this.handleOpen("add Prescription")}>
            Add Prescription
          </Button>
          <AntdModal />
        </p>
      </div>
    );
  }
}

export default connect(
  null,
  dispatch => bindActionCreators({ show }, dispatch)
)(App);
